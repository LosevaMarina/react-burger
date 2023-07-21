
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { getAuthChecked } from '../../utils/utils';

const Protected = ({ onlyUnAuth = false, component }) => {
  // isAuthChecked флаг. проверка токена проезведена
  const isAuthChecked = useSelector(getAuthChecked);

  const location = useLocation();
  const isRefreshToken = localStorage.getItem("refreshToken");
  const isAccessToken = localStorage.getItem("accessToken");
  const isTokensExist = isRefreshToken && isAccessToken;

  if (!isAuthChecked) {
    return null;
  }

  if (onlyUnAuth && isTokensExist) {
    // Пользователь авторизован, но роут предназначен для неавторизованного пользователя
    // Делаем редирект на главную страницу или на тот адрес, что записан в location.state.from
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !isTokensExist) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // !onlyUnAuth && user Пользователь авторизован и роут для авторизованного пользователя
  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }) => (
  <Protected onlyUnAuth={false} component={component} />
);














{/*

import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRouteElement = ({ element }) => {
  const isLoggedIn = useSelector((store) => store.user.isAuthChecked);
  const authError = useSelector((store) => store.user.authError);

  if (!isLoggedIn || authError === 'You should be authorized') {
    return <Navigate to='/login' replace={true} />;
  }

  return element;
};

export default ProtectedRouteElement;
*/}


