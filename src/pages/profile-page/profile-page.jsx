
import styles from './profile-page.module.css';
import { NavLink } from "react-router-dom";

const ProfilePage = () => {

    return (
        <section className={styles.content}>
          <nav className={styles.menu}>

                <NavLink
                  to='/profile'
                  className={({ isActive }) => (isActive ? (`${styles.link_active} + text_type_main-medium text_color_inactive text`) : (`${styles.link} + text_type_main-medium text_color_inactive text`))}
                  exact
                >
                  Профиль
                </NavLink>
                
                <NavLink
                  to='/profile/orders'
                  className={({ isActive }) => (isActive ? (`${styles.link_active} + text_type_main-medium text_color_inactive text`) : (`${styles.link} + text_type_main-medium text_color_inactive text`))}
                  >
                  История заказов
                </NavLink>

                <NavLink
                  to='/login'
                  className={({ isActive }) => (isActive ? (`${styles.link_active} + text_type_main-medium text_color_inactive text`) : (`${styles.link} + text_type_main-medium text_color_inactive text`))}
                  >
                  Выход
                </NavLink>

            <p
              className={`${styles.text} text_type_main-default text_color_inactive text`}
            >
              В этом разделе вы можете изменить свои персональные данные
            </p>
          </nav>

</section>
    )

}

export {ProfilePage}