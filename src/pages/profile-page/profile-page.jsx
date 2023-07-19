
import styles from './profile-page.module.css';
import { NavLink } from "react-router-dom";
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { useRef } from 'react';



const ProfilePage = () => {

 
  const inputRef = useRef(null)



    return (
        <section className={styles.conteiner}>
          <div className={styles.content}>
          <nav className={styles.menu}>
                <NavLink
                to='/profile'
                className={({ isActive }) => (isActive ? (`${styles.link_active} + text_type_main-medium text_color_inactive text`) : (`${styles.link} + text_type_main-medium text_color_inactive text`))}
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
          <form className={styles.profile}>
            <div className={styles.input}>
              <Input
                type={'text'}
                placeholder={'Имя'}
                name={'name'}
                size={'default'}
                extraClass="ml-1"

                
                icon={'EditIcon'}
                error={false}
                ref={inputRef}

              />
            </div>
            <div className={styles.input}>
              <EmailInput
                name={'email'}
                placeholder={'Логин'}
                extraClass="ml-1"
                icon={'EditIcon'}
                type={'email'}
                error={false}
                size={'default'}
                ref={inputRef}
                errorText={'Ошибка'}
              />
            </div>
            <div className={styles.input}>
              <PasswordInput
                placeholder={'Пароль'}
                //icon={'EditIcon'}
                name={"password"} 
                extraClass="mb-2" 
                type={'password'}
              />
            </div>

            <Button htmlType='submit' type='primary' size='large' extraClass='mt-3'>
              Сохранить
            </Button>
          </form>
          </div>
</section>
    )

}

export {ProfilePage}