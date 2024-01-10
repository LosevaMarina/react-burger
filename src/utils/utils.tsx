
const accessToken: string | undefined = localStorage.getItem("accessToken")
  ? localStorage.getItem("accessToken")?.slice(7)
  : "";
export const ORDERS_URL = `wss://norma.nomoreparties.space/orders?token=${accessToken}`;
export const API_URL = "https://norma.nomoreparties.space/api";

export const FEED_URL = "wss://norma.nomoreparties.space/orders/all";


{/*
export const checkResponse = (res: Response) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};
*/}

export const checkResponse = (res: Response) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const api = (url: string) => {
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
  email: string,
  password: string,
  name: string
) => {
  return fetch("https://norma.nomoreparties.space/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
    }),
  }).then((res) => checkResponse(res));
};

export const login = (email: string, password: string) => {
  return fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  }).then((res) => checkResponse(res));
};


export const logout = (token: string | null) => {
  return fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
    }),
  }).then((res) => checkResponse(res));
};


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



export const postOrder = (burger: string[]) => {
  return fetchWithRefresh("POST", `${API_URL}/orders`, { ingredients: burger });
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
  endpoint?: object | null
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

export { api };




















{/*import { THeaders } from "./data";
import {IUserResponse} from "./data";
export const API_URL = "https://norma.nomoreparties.space/api";

export const FEED_URL = "wss://norma.nomoreparties.space/orders/all";

const accessToken: string | undefined = localStorage.getItem("accessToken")
  ? localStorage.getItem("accessToken")?.slice(7)
  : "";

export const ORDERS_URL = `wss://norma.nomoreparties.space/orders?token=${accessToken}`;
//export const ORDERS_URL = "wss://norma.nomoreparties.space/orders";
export const checkResponse = (res: Response) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export function request(url: string, options?: RequestInit) {
  return fetch(url,options).then((res) => checkResponse(res));
}


export const refreshToken = () => {
  return request(`${API_URL}/auth/token`, { 
    method: "POST",
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
};


interface IOptions {
  method: "GET" | "POST" | "PATCH" | "DELETE";
  headers: {
   "Content-Type": string;
    authorization?: string | any;
 };
  body?: string;
}

export const fetchWithRefresh = async (endpoint: string, options: IOptions): Promise<IUserResponse> => {
 // export const fetchWithRefresh = async (
 //   options: any,
 //   endpoint?: object | null
 // ) => {
  try {
    const res = await request(`${API_URL}/${endpoint}`, options);
    return await checkResponse(res); 
  } catch (err:any) {
    if (err.message === "jwt expired") {
      //обновляем токен
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      } 
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(`${API_URL}/${endpoint}`, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};







//export const getUser = ():  Promise<IUserResponse> => {
  export const getUser = () => {
  return fetchWithRefresh("auth/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      authorization: localStorage.getItem("accessToken"),
    } as (HeadersInit | undefined) & THeaders,
  });
};

 
export const createUser = ( email:string,
  password:string,
  username:string) => {
 // return request(`${API_URL}/auth/register`, {
    return fetch(`${API_URL}/auth/register`, {

    method: "POST",
    body: JSON.stringify({
      email: email, 
      password: password,
      name: username,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};



export const updateUser = (name: string, email: string, password: string ) => {
  return fetchWithRefresh("auth/user", {
    method: "PATCH",
    body: JSON.stringify({
      email: email,
      name: name,
      password: password,
    }),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      authorization: localStorage.getItem("accessToken"),
    },
  });
};


export const resetPassword = (password: string, token:string) => {
  return request(`${API_URL}/password-reset/reset`, {
    method: "POST",
    body: JSON.stringify({
      password: password,
      token: token,
    }),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
};

export const logout = () => {
  return request(`${API_URL}/auth/logout`, {
    method: "POST",
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
};


export const login = ( email: string, password: string ) => {
  return request(`${API_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
};


export const forgotPassword = (value: string) => {
  return request(`${API_URL}/password-reset`, {
    method: "POST",
    body: JSON.stringify({
      email: value,
    }),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
};

*/}