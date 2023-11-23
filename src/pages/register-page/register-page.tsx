import {
  Button,
  EmailInput,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../login-page/login-page.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState, useRef, MouseEvent } from "react";
import { createUser } from "../../utils/utils";
import { GET_USER_SUCCESS } from "../../services/actions/registration-user";
import { refreshToken, accessToken, routeLogin } from "../../utils/data";

const RegisterPage = () => {
  const [nameValue, setNameValue] = useState("");
  //const inputRef = useRef(null);
  
  const inputRef = useRef<HTMLInputElement>(null);

  const onIconClick = () => {
    //setTimeout(() => inputRef.current.focus(), 0);
    setTimeout(() => inputRef.current && inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };

  const [emailValue, setEmailValue] = useState("");
  //const onChangeEmail = (e: MouseEvent<HTMLFormElement>) => {
   // setEmailValue(e.target.value);
  //};

  const [passwordValue, setPasswordValue] = useState("");
 // const onChangePassword = (e: React.FormEvent) => {
 //   setPasswordValue(e.target.value);
 // };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUser(emailValue, passwordValue, nameValue)
      .then((res) => {
        localStorage.setItem(refreshToken, res.refreshToken);
        localStorage.setItem(accessToken, res.accessToken);
        navigate("/");
        dispatch({
          type: GET_USER_SUCCESS,
          user: res.user,
        });
      })
      .catch((err) => {
        console.log(`Произошла ошибка регистрации пользователя: ${err}`);
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
          value={nameValue}
          onChange={(e) => setNameValue(e.target.value)}
          onIconClick={onIconClick}
        />
      </div>
      <div className={styles.input}>
        <EmailInput
          name={"email"}
          isIcon={false}
          onChange={(e) => setEmailValue(e.target.value)}
          value={emailValue}
        />
      </div>
      <div className={styles.input}>
        <PasswordInput
          name={"password"}
          extraClass="mb-2"
          onChange={(e) => setPasswordValue(e.target.value)}
          value={passwordValue}
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
