import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useMatch, NavLink } from "react-router-dom";
import styles from "./app-header.module.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { routeHome, routeProfile, routeOrderFeed, routeUser, routeLogin } from '../../utils/data';

export const AppHeader = () => {
  const isConstructor = !!useMatch({ path: "/", exact: true });
  const isFeed = !!useMatch("/feed");
  const isProfile = !!useMatch("/profile");

  const isAuthChecked = useSelector((store) => store.user.isAuthChecked);
  const { user } = useSelector((state) => state.user);

  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (isAuthChecked && user) {
      setUserName(user.name);
    } else {
      setUserName("Личный кабинет");
    }
  }, [isAuthChecked, user]);


  const checkUser = () => {
    if (isAuthChecked) {
        return `${routeUser}/${routeProfile}`
    }
    return routeLogin
}




  return (
    <header className={styles.header}>
      <nav className={styles.content}>
        <div className={styles.navigator}>
          <NavLink
            to={routeHome}
            className={({ isActive }) =>
              isActive ? styles.link_active : styles.link
            }
          >
            <BurgerIcon type={isConstructor ? "primary" : "secondary"} />
            <p className="text text_type_main-default ml-2">Конструктор</p>
          </NavLink>

          <NavLink
            to={routeOrderFeed}
            className={({ isActive }) =>
              isActive ? styles.link_active : styles.link
            }
          >
            <ListIcon type={isFeed ? "primary" : "secondary"} />
            <p className="text text_type_main-default ml-2">Лента заказов</p>
          </NavLink>
        </div>
        <NavLink to={routeHome}>
          <div className={styles.logo}>
            <Logo />
          </div>
        </NavLink>

        <NavLink
          to={checkUser()}
          className={({ isActive }) =>
            isActive ? styles.link_active : styles.link
          }
        >
          <ProfileIcon type={isProfile ? "primary" : "secondary"} />
          <p className="text text_type_main-default ml-2">{userName}</p>
        </NavLink>
      </nav>
    </header>
  );
};
