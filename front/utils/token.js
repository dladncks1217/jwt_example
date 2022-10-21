import axios from "axios";

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

    localStorage.setItem("accessToken", result.data.data.accessToken);
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
};
