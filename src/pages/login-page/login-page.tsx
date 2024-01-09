import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login-page.module.css";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { login } from "../../utils/utils";
import { GET_USER_SUCCESS } from "../../services/actions/registration-user";
import { routeHome, routeRegister, routeForgotPassword } from '../../utils/data';
import { refreshToken, accessToken } from "../../utils/data";

export const LoginPage = () => {
  function useForm(inputValues:any) {
    const [values, setValues] = useState(inputValues);

    const handleChange = (event:any) => {
      const { value, name } = event.target;
      setValues({ ...values, [name]: value });
    };
    return { values, handleChange, setValues };
  }

  const { values, handleChange } = useForm({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  //const [email, setEmail] = useState('')

  //const [password, setPassword] = useState('')

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    login(values, values.password)
      .then((res) => {
        localStorage.setItem(refreshToken, res.refreshToken);
        localStorage.setItem(accessToken, res.accessToken);
        navigate( '/');
        let pathroute;
        if (location.state === null || location.state.from === null) {
          pathroute = routeHome;
        } else {
          pathroute = location.state.from.pathname;
        }
        navigate(pathroute);

        dispatch({
          type: GET_USER_SUCCESS,
          user: res.user,
        });
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      });
  };

  return (
    <form className={styles.content} onSubmit={handleSubmit}>
      <h1 className={`${styles.title} text text_type_main-medium`}>Вход</h1>
      <div className={styles.input}>
        <EmailInput
          name={"email"}
          isIcon={false}
          onChange={handleChange}
          //onChange={e => setEmail(e.target.value)}
          value={values.email}
          //value={email}
        />
      </div>
      <div className={styles.input}>
        <PasswordInput
          name={"password"}
          extraClass="mb-2"
          onChange={handleChange}
          //onChange={e => setPassword(e.target.value)}
          value={values.password}
          //value={password}
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
