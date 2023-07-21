export const API_URL = "https://norma.nomoreparties.space/api";

export const checkResponse = (res) => {
  return res.ok
    ? res.json()
    : res.json().then(() => Promise.reject(res.status));
};

export function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

export const getAuthChecked = (state) => state.user.isAuthChecked;


export const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(`${API_URL}/${url}`, options);
    return await checkResponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken(); //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(`${API_URL}/${url}`, options); 
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
}

export const getIngredients = () => {
  return request('ingredients', {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  })
}

export const forgotPassword = (value) => {
  return request('password-reset', {
    method: 'POST',
    body: JSON.stringify({
      "email": value
    }),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  })
}

export const resetPassword = (password, token) => {
  return request('password-reset/reset', {
    method: 'POST',
    body: JSON.stringify({
      "password": password,
      "token": token
    }),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  })
}

export const createUser = ({email, password, username}) => {
  return request('auth/register', {
    method: 'POST',
    body: JSON.stringify({
      "email": email,
      "password": password,
      "name": username
    }),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  })
}

export const login = ({email, password}) => {
  return request('auth/login', {
    method: 'POST',
    body: JSON.stringify({
      "email": email,
      "password": password,
    }),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  })
}


export const logout = () => {
  return request('auth/logout', {
    method: 'POST',
    body: JSON.stringify({
      "token": localStorage.getItem("refreshToken"),
    }),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  })
}

export const refreshToken = () => {
  return request('auth/token', {
    method: 'POST',
    body: JSON.stringify({
      "token": localStorage.getItem("refreshToken"),
    }),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  })
}

export const getUser = () => {
  return fetchWithRefresh('auth/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      authorization: localStorage.getItem('accessToken')
    }
  })
}

export const updateUser = ({name, email, password}) => {
  return fetchWithRefresh('auth/user', {
    method: 'PATCH',
    body: JSON.stringify({

        "email": email,
        "name": name,
        "password": password

    }),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      authorization: localStorage.getItem('accessToken')
    }
  })
}

