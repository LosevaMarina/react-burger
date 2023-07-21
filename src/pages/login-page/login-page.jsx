import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login-page.module.css";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
//import { loginApi } from '../../services/actions/login';
//import {setCookie } from "../../utils/cookies";
import { login } from "../../utils/utils";
import { GET_USER_SUCCESS } from '../../services/actions/registration-user';



export const LoginPage = () => {

  

function useForm(inputValues) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event) => {
    const {value, name} = event.target;
    setValues({...values, [name]: value});
  };
  return {values, handleChange, setValues};
}


const {values, handleChange} = useForm({email: '', password: ''});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email: values.email, password: values.password })
      .then(res => {
        localStorage.setItem("refreshToken", res.refreshToken);
        localStorage.setItem("accessToken", res.accessToken);
        //navigate( '/');
        let pathroute;
        if (location.state === null || location.state.from ===null ) {
          pathroute = "/";
        } else {
          pathroute = location.state.from.pathname;
        }
        navigate(pathroute);

        dispatch({
          type: GET_USER_SUCCESS,
          user: res.user
        })
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      })
  }

  return (
    <form className={styles.content} onSubmit={handleSubmit}>
      <h1 className={`${styles.title} text text_type_main-medium`}>Вход</h1>
      <div className={styles.input}>
        <EmailInput 
        name={"email"} 
        isIcon={false} 
        onChange={handleChange}
        value={values.email}
        />
      </div>
      <div className={styles.input}>
        <PasswordInput 
        name={"password"} 
        extraClass="mb-2" 
        onChange={handleChange}
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