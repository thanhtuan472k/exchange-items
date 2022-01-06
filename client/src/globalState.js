import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import PostAPI from "./api/PostAPI";
import UserAPI from "./api/UserAPI";
import AdAPI from "./api/AdAPI";
import ChatAPI from "./api/ChatAPI";
import CategoriesAPI from "./api/CategoriesAPI";

export const GlobalState = createContext();
export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);

  //get access token
  const refreshToken = async () => {
    const res = await axios.get("/user/check-auth");
    setToken(res.data.accesstoken);
    setTimeout(() => {
      refreshToken();
    }, 10 * 60 * 1000); 
  };
  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) refreshToken();
  }, []);

  const state = {
    token: [token, setToken],
    userAPI: UserAPI(token),
    postsAPI: PostAPI(),
    categoriesAPI: CategoriesAPI(),
    adAPI: AdAPI(token),
    chatAPI: ChatAPI(token)
  };
  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
