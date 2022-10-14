import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDataAction, loginAction } from "../actions/auth";
import { Redirect } from "react-router-dom";
import { useRouter } from "next/router";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { isLoggedIn, nick } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value);
  });

  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  });

  const onSubmitData = useCallback((e) => {
    e.preventDefault();
    dispatch(loginAction({ email, password }));
  });

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(getUserDataAction());
    }
  }, [isLoggedIn]);

  return (
    <>
      <form onSubmit={onSubmitData}>
        email <input type="email" value={email} onChange={onChangeEmail} />{" "}
        <br />
        password{" "}
        <input type="password" value={password} onChange={onChangePassword} />
        <button type="submit">로그인</button>
      </form>
    </>
  );
};

export default Login;
