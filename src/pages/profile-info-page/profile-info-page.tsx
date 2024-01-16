import styles from './profile-info-page.module.css';
import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { updateUser } from "../../utils/utils";
import { useAppSelector } from "../../hooks/hooks";


export const ProfileInfoPage = () => {

    const user = useAppSelector((state) => state.user.user);
    const password = useAppSelector((state) => state.user.password);
    const [isChangeInput, setChangeInput] = useState(false);
    const [isLoginInputDisabled, setLoginInputDisabled] = useState(true);
    const [name, setName] = useState(user?.name);
    const [email, setEmail] = useState(user?.email);
    const [newPassword, setNewPassword] = useState(password);




    const saveUser = (e: React.SyntheticEvent) => {
      e.preventDefault();
      updateUser(
        name!,
        email!,
        newPassword
      )
      .catch((err) => {
        console.log(`Ошибка сохранения: ${err}`);
      });
    };



    
    const cancelChanges = () => {
      setName(user?.name);
      setEmail(user?.email);
      setNewPassword("");
    };
  

    const onIconClick = () => {
      setLoginInputDisabled(false);
    };



return (
    <section>
        <form className={styles.profile} onSubmit={saveUser}>
          <div className={styles.input}>
            <Input
              onChange={(e) => {
                setName(e.target.value);
                setChangeInput(true);
      }
    }
              type={"text"}
              placeholder={"Имя"}
              name={"name"}
              size={"default"}
              extraClass="ml-1"
              disabled={isLoginInputDisabled}
              onIconClick={onIconClick}
              icon={"EditIcon"}
              error={false}
              value={name?name:""}
              errorText={"Ошибка"}
            />
          </div>
          <div className={styles.input}>
            <EmailInput
              //onChange={changeInput}
              onChange={(e) => {
                setEmail(e.target.value);
                setChangeInput(true);
              }
            }
              name={"email"}
              placeholder={"Логин"}
              extraClass="ml-1"
              isIcon={true}
              value={email?email:""}
            />
          </div>
          <div className={styles.input}>
            <PasswordInput
              //onChange={changeInput}
              onChange={(e) => {
                setNewPassword(e.target.value);
                setChangeInput(true);
              }
            }
              placeholder={"Пароль"}
              icon="EditIcon"
              name={"password"}
              value={newPassword}
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




