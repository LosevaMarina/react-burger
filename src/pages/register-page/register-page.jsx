import {
  Button,
  EmailInput,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./register-page.module.css";
import { Link } from "react-router-dom";
import { registrationUserAction } from "../../services/actions/registration-user";

const RegisterPage = () => {
  return (
    <form className={styles.content}>
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
        />
      </div>
      <div className={styles.input}>
        <EmailInput name={"email"} isIcon={false} />
      </div>
      <div className={styles.input}>
        <PasswordInput name={"password"} extraClass="mb-2" />
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
          <Link to="/login" className={styles.links}>
            Войти
          </Link>
        </span>
      </p>
    </form>
  );
};

export { RegisterPage };
