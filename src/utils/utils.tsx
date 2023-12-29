import {useTypeSelector} from "../hooks/use-type-selector";
import {IUserResponse, TTokenResponse, THeaders} from "./data";
export const API_URL = "https://norma.nomoreparties.space/api";

export const FEED_URL = "wss://norma.nomoreparties.space/orders/all";

const accessToken: string | undefined = localStorage.getItem("accessToken")
  ? localStorage.getItem("accessToken")?.slice(7)
  : "";

export const ORDERS_URL = `wss://norma.nomoreparties.space/orders?token=${accessToken}`;

export const checkResponse = (res: Response) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export function request(url: string, options?: RequestInit) {
  return fetch(url).then((res) => checkResponse(res));
}




{/*
export const forgotPassword = (value) => {
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

export const resetPassword = (password, token) => {
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

export const createUser = ({ email, password, username }) => {
  return request(`${API_URL}/auth/register`, {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
      name: username,
    }),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
};

export const login = ({ email, password }) => {
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
};*/}






export const refreshToken = (): Promise<TTokenResponse>  => {
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


//interface IOptions {
//  method: "GET" | "POST" | "PATCH" | "DELETE";
//  headers: {
 //   "Content-Type": string;
 //   authorization?: string;
 // };
  //body?: string;
//}

//export const fetchWithRefresh = async (endpoint: string, options: IOptions): Promise<IUserResponse> => {
  export const fetchWithRefresh = async (
    options: any,
    endpoint?: object | null
  ) => {
  try {
    const res = await fetch(`${API_URL}/${endpoint}`, options);
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
  return request(`${API_URL}/auth/register`, {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
      name: username,
    }),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
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




























{/*


export const API_URL = "https://norma.nomoreparties.space/api";

export const FEED_URL = "wss://norma.nomoreparties.space/orders/all";
const accessToken = localStorage.getItem("accessToken")
  ? localStorage.getItem("accessToken").slice(7)
  : "";

export const ORDERS_URL = `wss://norma.nomoreparties.space/orders?token=${accessToken}`;

export const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

export const getAuthChecked = (state) => state.user.isAuthChecked;

export const fetchWithRefresh = async (endpoint, options) => {
  try {
    const res = await fetch(`${API_URL}/${endpoint}`, options);
    return await checkResponse(res); 
  } catch (err) {
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

export const forgotPassword = (value) => {
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

export const resetPassword = (password, token) => {
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

export const createUser = ({ email, password, username }) => {
  return request(`${API_URL}/auth/register`, {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
      name: username,
    }),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
};

export const login = ({ email, password }) => {
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

export const getUser = () => {
  return fetchWithRefresh("auth/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      authorization: localStorage.getItem("accessToken"),
    },
  });
};

export const updateUser = ({ name, email, password }) => {
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



*/}