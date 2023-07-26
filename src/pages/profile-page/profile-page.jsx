import styles from "./profile-page.module.css";
import { NavLink } from "react-router-dom";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, updateUser, getUser } from "../../utils/utils";
import { CLEAR_USER } from "../../services/actions/registration-user";
import { routeProfile, routeLogin } from '../../utils/data';
import { refreshToken, accessToken } from "../../utils/data";

const ProfilePage = () => {
  function useForm(inputValues) {
    const [values, setValues] = useState(inputValues);

    const handleChange = (event) => {
      const { value, name } = event.target;
      setValues({ ...values, [name]: value });
    };
    return { values, handleChange, setValues };
  }

  const { values, handleChange, setValues } = useForm({
    name: "",
    email: "",
    password: "",
  });
  const [isLoginInputDisabled, setLoginInputDisabled] = useState(true);
  const [isChangeInput, setChangeInput] = useState(false);
  const changeInput = (e) => {
    handleChange(e);
    setChangeInput(true);
  };

  const onIconClick = () => {
    setLoginInputDisabled(false);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const exit = (e) => {
    e.preventDefault();
    logout()
      .then((res) => {
        dispatch({
          type: CLEAR_USER,
        });
        //обновление токенов
        localStorage.removeItem(accessToken);
        localStorage.removeItem(refreshToken);
        navigate(routeLogin);
        //console.log("Удачный выход с аккаунта!");
      })
      .catch((err) => {
        console.log(`Ошибка при выходе с аккаунта: ${err}`);
      });
  };

  useEffect(() => {
    let isMounted = true;
    getUser()
      .then((res) => {
        if (isMounted) {
          setValues({ ...values, name: res.user.name, email: res.user.email });
        }
      })
      .catch((err) => {
        console.log(`Ошибка : ${err}`);
      });
    //clean
    return () => {
      isMounted = false;
    };
  }, []);

  const saveUser = (e) => {
    e.preventDefault();
    updateUser({
      name: values.name,
      email: values.email,
      password: values.password,
    }).catch((err) => {
      console.log(`Ошибка сохранения: ${err}`);
    });
  };

  const cancelChanges = (e) => {
    e.preventDefault();
    getUser()
      .then((res) => {
        setValues({ ...values, name: res.user.name, email: res.user.email });
      })
      .catch((err) => {
        console.log(`Произошла ошибка при отмене изменений: ${err}`);
      });
  };

  return (
    <section className={styles.conteiner}>
      <div className={styles.content}>
        <nav className={styles.menu}>
          <NavLink
            to={routeProfile}
            className={({ isActive }) =>
              isActive
                ? `${styles.link_active} + text_type_main-medium text_color_inactive text`
                : `${styles.link} + text_type_main-medium text_color_inactive text`
            }
          >
            Профиль
          </NavLink>

          <NavLink
            to="/profile/orders"
            className={({ isActive }) =>
              isActive
                ? `${styles.link_active} + text_type_main-medium text_color_inactive text`
                : `${styles.link} + text_type_main-medium text_color_inactive text`
            }
          >
            История заказов
          </NavLink>

          <NavLink
            to={routeLogin}
            className={({ isActive }) =>
              isActive
                ? `${styles.link_active} + text_type_main-medium text_color_inactive text`
                : `${styles.link} + text_type_main-medium text_color_inactive text`
            }
            onClick={exit}
          >
            Выход
          </NavLink>

          <p
            className={`${styles.text} text_type_main-default text_color_inactive text`}
          >
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </nav>
        <form className={styles.profile} onSubmit={saveUser}>
          <div className={styles.input}>
            <Input
              onChange={changeInput}
              type={"text"}
              placeholder={"Имя"}
              name={"name"}
              size={"default"}
              extraClass="ml-1"
              disabled={isLoginInputDisabled}
              onIconClick={onIconClick}
              icon={"EditIcon"}
              error={false}
              value={values.name}
              errorText={"Ошибка"}
            />
          </div>
          <div className={styles.input}>
            <EmailInput
              onChange={changeInput}
              name={"email"}
              placeholder={"Логин"}
              extraClass="ml-1"
              isIcon={true}
              value={values.email}
            />
          </div>
          <div className={styles.input}>
            <PasswordInput
              onChange={changeInput}
              placeholder={"Пароль"}
              icon="EditIcon"
              name={"password"}
              value={values.password}
            />
          </div>

          {isChangeInput && (
            <div>
              <Button
                htmlType="button"
                type="secondary"
                size="medium"
                onClick={cancelChanges}
              >
                Отмена
              </Button>
              <Button
                htmlType="submit"
                type="primary"
                size="large"
                extraClass="mt-3"
              >
                Сохранить
              </Button>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export { ProfilePage };
