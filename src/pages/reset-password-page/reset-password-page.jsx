import {
  Button,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../login-page/login-page.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { resetPassword } from "../../utils/utils";
import { routeLogin, routeForgotPassword } from "../../utils/data";

const ResetPasswordPage = () => {
  function useForm(inputValues) {
    const [values, setValues] = useState(inputValues);

    const handleChange = (event) => {
      const { value, name } = event.target;
      setValues({ ...values, [name]: value });
    };
    return { values, handleChange, setValues };
  }

  const { values, handleChange } = useForm({ password: "", code: "" });

  const navigate = useNavigate();
  let state = useLocation();

  const createNewPassword = (e) => {
    e.preventDefault();
    resetPassword(values.password, values.code)
      .then((res) => {
        if (res && res.success) {
          navigate(routeLogin);
        } else {
          alert("Ошибка восстановления пароля");
        }
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      });
  };

  useEffect(() => {
    if (
      state === null ||
      state.state === null ||
      !state.state.checkForgetToReset
    ) {
      navigate(routeForgotPassword);
    }
  }, [state]);

  return (
    <form className={styles.content} onSubmit={createNewPassword}>
      <h1 className={`${styles.title} text text_type_main-medium`}>
        Восстановление пароля
      </h1>
      <div className={styles.input}>
        <PasswordInput
          placeholder={"Введите новый пароль"}
          name={"password"}
          extraClass="mb-2"
          onChange={handleChange}
          value={values.password}
        />
      </div>
      <div className={styles.input}>
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          name={"code"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mb-2"
          value={values.code}
          onChange={handleChange}
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
          <Link to={routeLogin} className={styles.links}>
            Войти
          </Link>
        </span>
      </p>
    </form>
  );
};

export { ResetPasswordPage };
