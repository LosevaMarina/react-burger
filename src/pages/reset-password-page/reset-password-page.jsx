import {
  Button,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password-page.module.css";
import { Link, useNavigate } from "react-router-dom";
import { resetPasswordAction } from "../../services/actions/reset-password";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ResetPasswordPage = () => {

  const dispatch = useDispatch();
  const resetPassword = useSelector((state) => state.resetPassword);
  const navigate = useNavigate();
  const [value, setValue] = useState({
    password: '',
    token: '',
  });



  useEffect(() => {
    if (resetPassword.status === 'success') {
      navigate('/login');
      setValue({
        password: '',
        token: '',
      });
    }
  }, [resetPassword, navigate]);


  return (
    <form 
    className={styles.content}
    onSubmit={(e) => {
      e.preventDefault();
      dispatch(resetPasswordAction(value.password, value.token));
    }}
    
    >
      <h1 className={`${styles.title} text text_type_main-medium`}>
        Восстановление пароля
      </h1>
      <div className={styles.input}>
        <PasswordInput
          placeholder={"Введите новый пароль"}
          name={"password"}
          extraClass="mb-2"
          onChange={(e) => setValue({ ...value, password: e.target.value })}
          value={value.password}
        />
      </div>
      <div className={styles.input}>
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          name={"token"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mb-2"
          value={value.token}
          onChange={(e) => setValue({ ...value, token: e.target.value })}
        />
      </div>
      <div className={styles.input}>
        <Button
          htmlType="submit"
          type="primary"
          size="large"
          extraClass="mb-20"
        >
          Сохранить
        </Button>
      </div>
      <p
        className={`${styles.link_box} text text_type_main-default text_color_inactive mb-4`}
      >
        Вспомнили пароль?
        <span>
          <Link to="/login" className={styles.links}>
            Войти
          </Link>
        </span>
      </p>
    </form>
  );
};

export { ResetPasswordPage };
