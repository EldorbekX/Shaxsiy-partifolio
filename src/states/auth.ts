import { NavigateFunction } from "react-router-dom";
import { create } from "zustand";
import Cookies from "js-cookie";

import { TOKEN } from "../constants";
import { request } from "../request";
import { userLogin } from "../types";
import { message } from "antd";

type AuthTypes = {
  isAuthenticated: boolean;
  login: (data: userLogin, navigate: NavigateFunction) => void;
  logout: () => void;
};

export const useAuth = create<AuthTypes>((set) => ({
  isAuthenticated: Cookies.get(TOKEN) ? true : false,
  login: async (data, navigate) => {
    try {
      const res = await request.post("auth/login", data);
      Cookies.set(TOKEN, res.data.token);
      set({ isAuthenticated: true });
      navigate("/dashboard");
    } catch (err) {
      message.error("Username or password is wrong !");
    }
  },
  logout: () => {
    Cookies.remove(TOKEN);
    set({ isAuthenticated: false });
  },
}));
