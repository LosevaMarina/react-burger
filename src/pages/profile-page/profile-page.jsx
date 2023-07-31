import styles from "./profile-page.module.css";
import { NavLink, Outlet } from "react-router-dom";
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
import { routeProfile, routeLogin, routeUserOrders } from '../../utils/data';
import { refreshToken, accessToken } from "../../utils/data";

const ProfilePage = () => {

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
            to={routeUserOrders}
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


<Outlet />
      </div>
    </section>
  );
};

export { ProfilePage };
