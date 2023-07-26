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
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { HomePage } from "../../pages/home-page/home-page";
import { LoginPage } from "../../pages/login-page/login-page";
import { ForgotPasswordPage } from "../../pages/forgot-password-page/forgot-password-page";
import { ResetPasswordPage } from "../../pages/reset-password-page/reset-password-page";
import { NotFound404 } from "../../pages/not-found/not-found";
import { RegisterPage } from "../../pages/register-page/register-page";
import { ProfilePage } from "../../pages/profile-page/profile-page";
import { Page } from "../page/page";
import { OnlyAuth, OnlyUnAuth } from "../protected-route/protected-route";
import { routeHome, routeLogin, routeRegister, routeForgotPassword, routeResetPassword, routeProfile, routeIngredient, routeIngredientId, route404 } from "../../utils/data";

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
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

  return (
    <section className={styles.block}>
      <AppHeader />
      {REQUEST && <div className={styles.note}>загрузка...</div>}

      <Routes location={background || location}>
        <Route path={routeHome} element={<HomePage />} />

        <Route
          path={routeLogin}
          element={<OnlyUnAuth component={<LoginPage />} />}
        />

        <Route
          path={routeRegister}
          element={<OnlyUnAuth component={<RegisterPage />} />}
        />

        <Route
          path={routeForgotPassword}
          element={<OnlyUnAuth component={<ForgotPasswordPage />} />}
        />

        <Route
          path={routeResetPassword}
          element={<OnlyUnAuth component={<ResetPasswordPage />} />}
        />

        <Route
          path={routeProfile}
          element={<OnlyAuth component={<ProfilePage />} />}
        />

        <Route
          path={`${routeIngredient}${routeIngredientId}`}
          element={!background ?
            <Page /> : null
          }
        />

        <Route path={route404} element={<NotFound404 />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path={`${routeIngredient}${routeIngredientId}`}
            element={
              <Modal closeModal={closeIngredientDetailsModal}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </section>
  );
};
