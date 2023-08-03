import styles from './profile-info-page.module.css';
import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useEffect } from "react";
import { updateUser, getUser } from "../../utils/utils";


export const ProfileInfoPage = () => {
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
    <section>
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
    </section>
)
          }