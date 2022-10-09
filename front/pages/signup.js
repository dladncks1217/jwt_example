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

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(signUpAction({ email, password, nick }));
    },
    [email, password]
  );

  return (
    <>
      <form>
        <input type="email" value={email} onChange={onChangeEmail} />
        <input type="password" value={password} onChange={onChangePassword} />
        <input
          type="password"
          value={passwordcheck}
          onChange={onChangePasswordCheck}
        />
        <input type="text" value={nick} onChange={onChangeNick} />
        <button type="submit" onSubmit={onSubmit}>
          가입
        </button>
      </form>
    </>
  );
};

export default SignUp;
