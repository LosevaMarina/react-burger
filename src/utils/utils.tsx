
import {IUseFormTypes} from "../hooks/hooks";
import {TUserType} from "./data";

const accessToken: string | undefined = localStorage.getItem("accessToken")
  ? localStorage.getItem("accessToken")?.slice(7)
  : "";
  
export const ORDERS_URL = `wss://norma.nomoreparties.space/orders?token=${accessToken}`;
export const API_URL = "https://norma.nomoreparties.space/api";

export const FEED_URL = "wss://norma.nomoreparties.space/orders/all";

export const checkResponse = (res: Response) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const api = (url: string) => {
  return fetch(url).then((res) => checkResponse(res));
};

export function request(url: string, options?: RequestInit) {
  return fetch(url,options).then((res) => checkResponse(res));
}


export const forgotPassword = (data: string) => {
  return fetch(`${API_URL}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: data,
    }),
  }).then((res) => checkResponse(res));
};


export const resetPassword = (newPassword: string, key: string) => {
  return fetch(`${API_URL}/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: newPassword,
      token: key,
    }),
  }).then((res) => checkResponse(res));
};



export const createUser = (
  data: IUseFormTypes
) => {
  const {email, password, name} = data
  return fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      name,
    }),
  }).then((res) => checkResponse(res));
};



export const login = (data: IUseFormTypes) => {
  return fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => checkResponse(res));
};



export const logout = (data: string) => {
  return fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          token: data
      })
  }).then((res) => checkResponse(res));
}


export const getUser = () => {
  return fetchWithRefresh("GET", `${API_URL}/auth/user`);
};


export const updateUser = (
  newName: string,
  newEmail: string,
  newPassword: string
) => {
  return fetchWithRefresh("PATCH", `${API_URL}/auth/user`, {
    name: newName,
    email: newEmail,
    password: newPassword,
  });
};



export const postOrder = (data: string) => {
  return fetchWithRefresh("POST", `${API_URL}/orders`, { ingredients: data });
};


export const refreshToken = () => {
  return fetch(`${API_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then((res) => checkResponse(res));
};

export const fetchWithRefresh = async (
  method: string,
  URL: string,
  endpoint?: object | null,
  token?: string | null
) => {
  
  const config = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("accessToken")!,
    },
    body: JSON.stringify(endpoint),
  };
  try {
    const res = await fetch(URL, config);
    return await checkResponse(res);
  } catch (err) {
    if (err instanceof Error && err.message === "jwt expired") {
      const refreshData = await refreshToken(); //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      config.headers.authorization = refreshData.accessToken;
      const res = await fetch(URL, config); //повторяем запрос
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};
