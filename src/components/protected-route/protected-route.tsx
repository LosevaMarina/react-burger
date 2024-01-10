import { FC, ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
//import { getAuthChecked } from "../../utils/utils";
import { useAppSelector } from "../../hooks/hooks";

interface IProtected {
  onlyUnAuth?: boolean;
  component: ReactElement;
}


const Protected: FC<IProtected> = ({ onlyUnAuth = false, component }) => {
  //проверка токена произведена
  const isAuthChecked = useAppSelector((store) => store.user.isAuthChecked);

  console.log ("проверка токена произведена: isAuthChecked: "+ isAuthChecked);

  const location = useLocation();
  const user = useAppSelector((state) => state.user.user);
  console.log ("user: "+ user);
  if (!isAuthChecked) {
    return null;
  }

  if (onlyUnAuth && user) {
    //авторизация выполнена
    const { from } = location.state || { from: { pathname: "/" } };
    console.log ("авторизация выполнена!!!!!!!!!!!!!!!!!!!!! ");
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // !onlyUnAuth && user Пользователь авторизован и роут для авторизованного пользователя
  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth: FC<IProtected> = ({ component }) => (
  <Protected onlyUnAuth={true} component={component} />
);