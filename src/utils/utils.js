export const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then(() => Promise.reject(res.status))
  }
  
  export function request(url, options) {
    return fetch(url, options).then(checkResponse)
  }
  