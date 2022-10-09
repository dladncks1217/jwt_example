import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { loginAction } from "../actions/auth";

const Login = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value);
  });

  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  });

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    dispatch(loginAction({ email, password }));
  });

  return (
    <>
      <form>
        <input type="email" value={email} onChange={onChangeEmail} />
        <input type="password" value={password} onChange={onChangePassword} />
        <button type="submit" onSubmit={onSubmit}>
          로그인
        </button>
      </form>
    </>
  );
};

export default Login;
