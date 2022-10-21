import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name, value) => {
  return cookies.set(name, value, {
    maxAge: 60 * 60 * 24 * 14,
    httpOnly: true,
  });
};

export const getCookie = (name) => {
  return cookies.get(name);
};
