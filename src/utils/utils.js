import {API_URL} from './config';


export const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then(() => Promise.reject(res.status))
  }
  
  export function request(url, options) {
    return fetch(url, options).then(checkResponse)
  }



  export const orderApi = (orderItemsId) => {
    return fetch('https://norma.nomoreparties.space/api/orders', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        "ingredients": orderItemsId
      })
    })
    .then(checkResponse)
  };
  