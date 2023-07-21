import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../login-page/login-page.module.css";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { forgotPassword } from '../../utils/utils';

const ForgotPasswordPage = () => {

function useForm(inputValues) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event) => {
    const {value, name} = event.target;
    setValues({...values, [name]: value});
  };
  return {values, handleChange, setValues};
}


const {values, handleChange} = useForm({email: ''});
  const navigate = useNavigate();

  const restorePassword = (e) => {
    e.preventDefault();
    forgotPassword(values.email)
      .then((res) => {
        if (res && res.success) {
          navigate('/reset-password', { state: { checkForgetToReset: true } })
        } else {
          alert('Произошла ошибка при восстановлении пароля')
        }
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      })
  }



  return (
    <form
      className={styles.content}
      onSubmit={restorePassword}
    >
      <h1 className={`${styles.title} text text_type_main-medium`}>
        Восстановление пароля
      </h1>
      <div className={styles.input}>
        <EmailInput
          placeholder="Укажите E-mail"
          name={"email"}
          isIcon={false}
          onChange={handleChange}
          //value={values.email || " "}
          value={values.email}
        />
      </div>

      <div className={styles.input}>
        <Button
          htmlType="submit"
          type="primary"
          size="large"
          extraClass="mb-20"
        >
          Восстановить
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

export { ForgotPasswordPage };
