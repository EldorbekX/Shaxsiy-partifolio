import axios from "axios";
import Cookies from "js-cookie";
import { TOKEN } from "../constants/index";

const token = Cookies.get(TOKEN);

// const token = localStorage.getItem("TOKEN");
console.log("sfgfsPPP" ,token);

export const request = axios.create({
  baseURL: "https://ap-portfolio-backend.up.railway.app/api/v1/",
  timeout: 10000,
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});
