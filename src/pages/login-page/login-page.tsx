import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login-page.module.css";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FormEvent, useCallback, useState } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { login } from "../../utils/utils";
import { GET_USER_SUCCESS } from "../../services/actions/registration-user";
import { routeHome, routeRegister, routeForgotPassword } from '../../utils/data';
import { refreshToken, accessToken } from "../../utils/data";
import {useForm} from "../../hooks/hooks";
import {userLogin} from "../../services/actions/registration-user";
import {useAppSelector} from "../../hooks/hooks";
//import {TUserType} from "../../utils/data";

export const LoginPage = () => {

  const { values, handleChange } = useForm({ email: "", password: "" });
  //const [emailValue, setEmailValue] = useState("");
  //const [passwordValue, setPasswordValue] = useState("");
  const isAuthChecked = useAppSelector((state) => state.user.isAuthChecked);


  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
        dispatch(userLogin(values))
        if (isAuthChecked) 
        navigate(routeHome);
        let pathroute;
        if (location.state === null || location.state.from === null) {
          pathroute = routeHome;
        } else {
          pathroute = location.state.from.pathname;
        }
        navigate(pathroute);
      }

    
  
  



  return (
    <form className={styles.content} onSubmit={handleSubmit}>
      <h1 className={`${styles.title} text text_type_main-medium`}>Вход</h1>
      <div className={styles.input}>
        <EmailInput
          name={"email"}
          isIcon={false}
          onChange={handleChange}
          //onChange={e => setEmailValue(e.target.value)}
          //value={emailValue}
          value={values.email}
        />
      </div>
      <div className={styles.input}>
        <PasswordInput
          name={"password"}
          extraClass="mb-2"
          onChange={handleChange}
          //onChange={e => setPasswordValue(e.target.value)}
          //value={passwordValue}
          value={values.password}
        />
      </div>

      <div className={styles.input}>
        <Button
          htmlType="submit"
          type="primary"
          size="large"
          extraClass="mb-20"
        >
          Войти
        </Button>
      </div>
      <p
        className={`${styles.link_box} text text_type_main-default text_color_inactive mb-4`}
      >
        Вы - новый пользователь?
        <span>
          <Link to={routeRegister} className={styles.links}>
            Зарегистрироваться
          </Link>
        </span>
      </p>
      <p
        className={`${styles.link_box} text text_type_main-default text_color_inactive mb-4`}
      >
        Забыли пароль?
        <span>
          <Link to={routeForgotPassword} className={styles.links}>
            Восстановить пароль
          </Link>
        </span>
      </p>
    </form>
  );
};
