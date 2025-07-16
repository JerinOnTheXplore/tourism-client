// src/utils/getJwtToken.js
import axios from "axios";

export const getJwtToken = async (user) => {
  const res = await axios.post("https://tourism-server-delta.vercel.app/api/jwt", {
    email: user.email,
  });

  const token = res.data.token;
  if (token) {
    localStorage.setItem("access-token", token);
  }
};
