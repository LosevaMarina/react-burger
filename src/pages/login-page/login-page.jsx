import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login-page.module.css";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <form className={styles.content}>
      <h1 className={`${styles.title} text text_type_main-medium`}>Вход</h1>
      <div className={styles.input}>
        <EmailInput 
        name={"email"} 
        isIcon={false} 
        
        
        />
      </div>
      <div className={styles.input}>
        <PasswordInput 
        name={"password"} 
        extraClass="mb-2" 

        
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
        </span>{" "}
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

export { LoginPage };
