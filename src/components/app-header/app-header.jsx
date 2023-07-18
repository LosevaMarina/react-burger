import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useMatch, NavLink } from "react-router-dom";
import styles from "./app-header.module.css";


export const AppHeader = () => {

  const isConstructor = !!useMatch({ path: "/", exact: true});
  const isFeed = !!useMatch("/feed");
  const isProfile = !!useMatch("/profile");

  return (
    <header className={styles.header}>
      <nav className={styles.content}>
        <div className={styles.navigator}>

          <NavLink
            to = "/"
            className={({ isActive }) => (isActive ? styles.link_active : styles.link)}
            exact
            >
            <BurgerIcon type={isConstructor ? "primary" : "secondary"} />
            <p className="text text_type_main-default ml-2">Конструктор</p>
          </NavLink>

          <NavLink
            to = "/feed"
            className={({ isActive }) => (isActive ? styles.link_active : styles.link)}
            >
            <ListIcon type={isFeed ? "primary" : "secondary"} />
            <p className="text text_type_main-default ml-2">
              Лента заказов
            </p>
          </NavLink>

        </div>

        <div className={styles.logo}>
          <Logo />
        </div>

        <NavLink
            to = "/profile"
            className={({ isActive }) => (isActive ? styles.link_active : styles.link)}
            >
          <ProfileIcon type={isProfile ? "primary" : "secondary"}  />
          <p className="text text_type_main-default ml-2">
            Личный кабинет
          </p>
        </NavLink>

      </nav>
    </header>
  );
}
