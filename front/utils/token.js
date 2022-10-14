import axios from "axios";
import { getCookie } from "./cookie";

export const getExpiredTokenToAccessToken = async () => {
  try {
    console.log("zz");
    let result = await axios({
      method: "post",
      url: "auth/getnewtoken",
      headers: {
        withCredentials: true,
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        refresh: getCookie("refreshToken"),
      },
    });

    localStorage.setItem("accessToken", result.data.data.accessToken);
    return result;
  } catch (err) {
    console.error(err);
  }
};
