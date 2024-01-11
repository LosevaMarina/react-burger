 import {
  Button,
  EmailInput,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../login-page/login-page.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, FormEvent, FC } from "react";
import { createUser } from "../../utils/utils";
import { GET_USER_SUCCESS } from "../../services/actions/registration-user";
import { refreshToken, accessToken, routeLogin } from "../../utils/data";
import { useAppDispatch, useForm } from "../../hooks/hooks";
import {routeHome} from "../../utils/data";
 
const RegisterPage: FC = () => {
  //const [nameValue, setNameValue] = useState("");
  
  const inputRef = useRef<HTMLInputElement>(null);
  const { values, handleChange } = useForm({ name: "", email: "", password: "" });
  const onIconClick = () => {
    setTimeout(() => inputRef.current && inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };

  //const [emailValue, setEmailValue] = useState("");

  //const [passwordValue, setPasswordValue] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUser(values)
      .then((res) => {
        localStorage.setItem(refreshToken, res.refreshToken);
        localStorage.setItem(accessToken, res.accessToken);
        navigate(routeHome);

        dispatch({
          type: GET_USER_SUCCESS,
          user: res.user,
        });
      }) 
      .catch((err) => {
        console.log(err);

      });
  };




  return (
    <form className={styles.content} onSubmit={handleSubmit}>
      <h1 className={`${styles.title} text text_type_main-medium`}>
        Регистрация
      </h1>
      <div className={styles.input}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          name={"name"}
          size={"default"}
          extraClass="ml-1"
          value={values.name}
          //onChange={(e) => setNameValue(e.target.value)}
          onChange={handleChange}
          onIconClick={onIconClick}
        />
      </div>
      <div className={styles.input}>
        <EmailInput
          name={"email"}
          isIcon={false}
          //onChange={(e) => setEmailValue(e.target.value)}
          onChange={handleChange}
          value={values.email}
        />
      </div>
      <div className={styles.input}>
        <PasswordInput
          name={"password"}
          extraClass="mb-2"
          //onChange={(e) => setPasswordValue(e.target.value)}
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
          Зарегистрироваться
        </Button>
      </div>
      <p
        className={`${styles.link_box} text text_type_main-default text_color_inactive mb-4`}
      >
        Уже зарегистрированы?
        <span>
          <Link to={routeLogin} className={styles.links}>
            Войти
          </Link>
        </span>
      </p>
    </form>
  );
};

export { RegisterPage };