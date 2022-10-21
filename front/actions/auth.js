import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getExpiredTokenToAccessToken } from "../utils/token";

axios.defaults.baseURL = "http://localhost:3000/api/";

export const signUpAction = createAsyncThunk(
  "auth/join",
  async (data, thunkAPI) => {
    try {
      let result = await axios({
        method: "post",
        url: "/auth/join",
        data: {
          email: data.email,
          password: data.password,
          nick: data.nick,
          role: "guest",
        },
      });
      console.log(result);
      if (result.status === 200) return (location.href = "/");
    } catch (err) {
      console.error(err);
    }
  }
);

export const loginAction = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      let result = await axios({
        method: "post",
        url: "/auth/login",
        headers: {
          withCredentials: true, // 이거 있어야 서로 쿠키 주고받기 가능
        },
        data: {
          email: data.email,
          password: data.password,
        },
      });
      console.log(result);
      // accessToken의 경우 localStorage에 저장.
      localStorage.setItem("accessToken", result.data.data.accessToken);
      // setCookie("refreshToken", result.data.data.refreshToken);

      axios.defaults.headers.common["x-access-token"] =
        result.data.data.accessToken; // axios동작 시 헤더에 기본으로 붙도록

      if (result.data.ok) return (location.href = "/");
    } catch (err) {
      console.error(err);
    }
  }
);

export const logOutAction = createAsyncThunk(
  "auth/logout",
  async (data, thunkAPI) => {
    localStorage.removeItem("accessToken");
  }
);

export const getUserDataAction = createAsyncThunk(
  "auth/userData",
  async (data, thunkAPI) => {
    try {
      let result = await axios({
        method: "get",
        url: "/getuser",
        headers: {
          withCredentials: true,
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      return result;
    } catch (err) {
      if (err.response.status === 401) {
        if (err.response.data.message === "Not Logged In") {
          console.log("로그인필요");
        } else if (err.response.data.message === "jwt expired") {
          try {
            // 토큰 재발급
            return getExpiredTokenToAccessToken();
          } catch (e) {
            console.error(e);
          }
        }
      }
    }
  }
);
