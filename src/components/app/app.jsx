import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppHeader } from "../app-header/app-header";
import styles from "../app/app.module.css";
import { getIngredients } from "../../services/actions/burger-ingredients";
import { Modal } from "../modal/modal";
import {
  CLOSE_MODAL_INGREDIENT,
  NO_INGREDIENT,
} from "../../services/actions/ingredient-details";
import { IngredientDetails } from "../ingredient-details/ingredient-details.jsx";
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { HomePage } from "../../pages/home-page/home-page";
import { LoginPage } from "../../pages/login-page/login-page";
import { ForgotPasswordPage } from "../../pages/forgot-password-page/forgot-password-page";
import { ResetPasswordPage } from "../../pages/reset-password-page/reset-password-page";
import { NotFound404 } from "../../pages/not-found/not-found";
import { RegisterPage } from "../../pages/register-page/register-page";
import { ProfilePage } from "../../pages/profile-page/profile-page";
import { Page } from "../page/page";
import  { OnlyAuth, OnlyUnAuth } from "../protected-route/protected-route";


export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());

    {/*проверка авторизации пользователя:
    dispatch(checkUserAuth());
*/}

  }, [dispatch]);

  const location = useLocation();
  const background = location.state && location.state.background;
  const navigate = useNavigate();
  const REQUEST = useSelector(
    (state) => state.orderDetails.makeOrderRequestInProgress
  );

 function closeIngredientDetailsModal() {
    dispatch({ type: CLOSE_MODAL_INGREDIENT });
    dispatch({ type: NO_INGREDIENT });
    
    navigate(-1);
  }


  console.log (Boolean(localStorage.getItem("accessToken")) + "=>токены=>" + Boolean(localStorage.getItem("refreshToken")));
return (
  <section className={styles.block}>
      <AppHeader />
      {REQUEST && <div className={styles.note}>загрузка...</div>}
      
      <Routes location={background || location}>
            <Route path="/" element={<HomePage />} />
            
            <Route
              path="/login"
              element={<OnlyUnAuth component={<LoginPage />} />}
            />

            <Route
              path="/register"
              element={<OnlyUnAuth component={<RegisterPage />} />}
            />


            <Route 
              path="/forgot-password"
              element={<OnlyUnAuth component={<ForgotPasswordPage />} />}
            />

            <Route 
              path="/reset-password" 
              element={<OnlyUnAuth component={<ResetPasswordPage />} />}
            />

            
            <Route path={"/profile"} element={<OnlyAuth component={<ProfilePage />} />} />     
            

            <Route path="/ingredients/:_id" element={<Page> <IngredientDetails />
                  </Page>} />


            <Route path="*" element={<NotFound404 />} />
      </Routes>
      
      {background && (
            <Routes>
              <Route
                path='/ingredients/:_id'
                element={
                  <Modal closeModal={closeIngredientDetailsModal}>
                    <IngredientDetails />
                  </Modal>
                }
              />
            <Route
                path='/order'
                element={
                  <Modal closeModal={closeIngredientDetailsModal}>
                    <IngredientDetails />
                  </Modal>
                }
              />

            </Routes>
          )}

  </section>

)
};