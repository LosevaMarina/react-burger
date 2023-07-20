import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login-page.module.css";
import { useLocation, Navigate, Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginApi } from '../../services/actions/login';
import {setCookie } from "../../utils/cookies";

export const LoginPage = () => {

  const dispatch = useDispatch();
  const location = useLocation();
  const loginDetails = useSelector((store) => store.login);
  const isLoggedIn = useSelector((store) => store.user.isAuthChecked);


  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
  function onSubmitFrom(e) {
    e.preventDefault();
    dispatch(loginApi(formValues.email, formValues.password));
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

 

  const [fromPath, setFromPath] = useState('/');

  useEffect(() => {
    if (location.state && location.state.from) {
      setFromPath(location.state.from);
    }
  }, [location.state]);




  useEffect(() => {
    if (loginDetails.status) {
      setCookie(loginDetails.accessToken, loginDetails.refreshToken);
      setFormValues({
        email: '',
        password: '',
      });

      if (isLoggedIn) {
        return <Navigate to={location?.state?.from || '/'} />;
      }
    }
  }, [loginDetails, isLoggedIn, location.state]);





  return (
    <form className={styles.content}>
      <h1 className={`${styles.title} text text_type_main-medium`}>Вход</h1>
      <div className={styles.input}>
        <EmailInput 
        name={"email"} 
        isIcon={false} 
        onChange={handleChange}
        value={formValues.email}
        />
      </div>
      <div className={styles.input}>
        <PasswordInput 
        name={"password"} 
        extraClass="mb-2" 
        onChange={handleChange}
        value={formValues.password}
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
          <Link to="/register" className={styles.links}>
            Зарегистрироваться
          </Link>
        </span>
      </p>
      <p
        className={`${styles.link_box} text text_type_main-default text_color_inactive mb-4`}
      >
        Забыли пароль?
        <span>
          <Link to="/forgot-password" className={styles.links}>
            Восстановить пароль
          </Link>
        </span>
      </p>
    </form>
  );
};
