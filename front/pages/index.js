import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDataAction, logOutAction } from "../actions/auth";

const Index = () => {
  const dispatch = useDispatch();

  const { isLoggedIn, nick } = useSelector((state) => state.auth);

  const onClickLoginButton = useCallback((e) => {
    e.preventDefault();
    location.href = "/login";
  });

  const onClickSignUpButton = useCallback((e) => {
    e.preventDefault();
    location.href = "/signup";
  });

  const onClickLogoutButton = useCallback(
    (e) => {
      dispatch(logOutAction());
    },
    [isLoggedIn]
  );

  useEffect(() => {
    dispatch(getUserDataAction());
  }, [isLoggedIn, nick]);

  return (
    <>
      {isLoggedIn ? (
        <>
          <p>{nick}님으로 로그인되어있습니다.</p>
          <button onClick={onClickLogoutButton}>logout</button>
        </>
      ) : (
        <>
          <button onClick={onClickLoginButton}>login</button>
          <button onClick={onClickSignUpButton}>signup</button>
        </>
      )}
    </>
  );
};

export default Index;
