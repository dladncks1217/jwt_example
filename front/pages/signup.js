import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { signUpAction } from "../actions/auth";

const SignUp = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordcheck, setPasswordCheck] = useState();
  const [nick, setNick] = useState();

  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value);
  });

  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  });

  const onChangePasswordCheck = useCallback((e) => {
    setPasswordCheck(e.target.value);
  });

  const onChangeNick = useCallback((e) => {
    setNick(e.target.value);
  });

  const onSubmitData = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(signUpAction({ email, password, nick }));
    },
    [email, password, nick]
  );

  return (
    <>
      <form onSubmit={onSubmitData}>
        email <input type="email" value={email} onChange={onChangeEmail} />
        <br />
        password{" "}
        <input type="password" value={password} onChange={onChangePassword} />
        <br />
        passwordcheck{" "}
        <input
          type="password"
          value={passwordcheck}
          onChange={onChangePasswordCheck}
        />
        <br />
        nick <input type="text" value={nick} onChange={onChangeNick} />
        <br />
        <button type="submit">가입</button>
      </form>
    </>
  );
};

export default SignUp;
