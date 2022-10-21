const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User } = require("../models");
const redisClient = require("../utils/redis-util");
const jsonwebtoken = require("jsonwebtoken");
const jwt = require("../utils/jwt-util");
const { verify, refreshVerify, sign } = require("../utils/jwt-util");

router.post("/join", async (req, res, next) => {
  const { email, nick, password, role } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.json("이미 가입된 이메일입니다.");
    }
    console.time("암호화 시간 확인용");
    const hash = await bcrypt.hash(password, 12);
    console.timeEnd("암호화 시간 확인용");
    const userData = await User.create({
      email,
      nick,
      password: hash,
      role,
    });

    return res.json(userData);
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post("/login", async (req, res) => {
  //... user 로그인 로직
  const { email, password } = req.body;

  const exUser = await User.findOne({ where: { email } });

  console.log("exUser" + exUser.nick);
  if (exUser) {
    const result = await bcrypt.compare(password, exUser.password);
    if (result) {
      // id, pw가 맞다면..
      // access token과 refresh token을 발급합니다.
      const tokenData = {
        id: exUser.id.toString(),
        nick: exUser.nick,
        role: exUser.role,
      };

      const accessToken = jwt.sign(tokenData);
      const refreshToken = jwt.refresh();

      // 발급한 refresh token을 redis에 key를 user의 id로 하여 저장합니다.

      redisClient.set(tokenData.id.toString(), refreshToken);
      res.cookie("refreshToken", refreshToken, {
        maxAge: 60 * 60 * 24 * 14,
        httpOnly: true,
        sameSite: "strict",
      });

      res.status(200).send({
        // client에게 accessToken만 반환합니다.
        ok: true,
        data: {
          accessToken,
        },
      });
    } else {
      res.status(401).send({
        ok: false,
        message: "wrong password",
      });
    }
  } else {
    res.status(401).send({
      ok: false,
      message: "없는 사용자입니다.",
    });
  }
});

router.post("/getnewtoken", async (req, res, next) => {
  if (req.headers.authorization && req.headers.cookie) {
    const accessToken = req.headers.authorization.split("Bearer ")[1];
    const refreshToken = req.headers.cookie.split("=")[1];

    // expired일 경우.
    const authResult = verify(accessToken);

    // access token 디코딩 -> 유저정보 가져오기
    const decoded = jsonwebtoken.decode(accessToken);

    // 디코딩 결과 없으면 권한 없음 응답.
    if (decoded === null) {
      res.status(401).send({
        ok: false,
        message: "No authorized!",
      });
    }

    // refreshToken 검증.
    const refreshResult = await refreshVerify(refreshToken, decoded.id);

    // access token이 만료되지 않은 경우.
    if (authResult.ok === false && authResult.message === "jwt expired") {
      // refreshtoken도 만료되었을 경우 -> 아예 새로 로그인해야함.
      if (refreshResult.ok === false) {
        res.status(401).send({
          ok: false,
          message: "No authorized",
        });
      } else {
        // access Token만 만료된 경우 (refresh token은 살아있고)
        const new_accessToken = sign({
          id: decoded.id,
          nick: decoded.nick,
          role: decoded.role,
        });

        res.status(200).send({
          // 새로 발급한 access token과 원래 있던 refresh token 모두 클라이언트에게 반환.
          ok: true,
          data: {
            accessToken: new_accessToken,
            userId: decoded.id,
            nick: decoded.nick,
            role: decoded.role,
          },
        });
      }
    }
  }
});

module.exports = router;
