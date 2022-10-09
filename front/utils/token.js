import axios from "axios";
// import  from '@reduxjs/toolkit'

export const getExpiredTokenToAccessToken = async () => {
  try {
    let result = await axios({
      method: "post",
      url: "auth/getnewtoken",
      headers: {
        withCredentials: true,
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    console.log(result.data);
    localStorage.setItem("accessToken", result.data.accessToken);
    return console.log("성공");
  } catch (err) {
    console.error(err);
  }
};
