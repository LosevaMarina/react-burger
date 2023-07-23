import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { getAuthChecked } from "../../utils/utils";

const Protected = ({ onlyUnAuth = false, component }) => {
  //проверка токена произведена
  const isAuthChecked = useSelector(getAuthChecked);

  const location = useLocation();

  const isRefreshToken = localStorage.getItem("refreshToken");
  const isAccessToken = localStorage.getItem("accessToken");
  const isTokensExist = isRefreshToken && isAccessToken;

  if (!isAuthChecked) {
    return null;
  }

  if (onlyUnAuth && isTokensExist) {
    //авторизация выполнена
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
  <Protected onlyUnAuth={true} component={component} />
);
