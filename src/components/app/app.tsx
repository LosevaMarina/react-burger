import { useEffect } from "react";
import { AppHeader } from "../app-header/app-header";
import styles from "../app/app.module.css";
import { getIngredients } from "../../services/actions/burger-ingredients";
import  {Modal}  from "../modal/modal";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
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
import {
  routeHome,
  routeLogin,
  routeRegister,
  routeForgotPassword,
  routeResetPassword,
  routeProfile,
  routeIngredient,
  routeIngredientId,
  route404,
  routeOrderFeed,
  routeUser,
  routeUserOrders,
  routeOrderFeedId,
} from "../../utils/data";
import { OrderFeedPage } from "../../pages/order-feed-page/order-feed-page";
import { ProfileInfoPage } from "../../pages/profile-info-page/profile-info-page";
import { UserOrdersPage } from "../../pages/user-orders-page/user-orders-page";
import { OrderDescription } from "../order-description/order-description";
import { OrderDescriptionInProfile } from "../order-description-in-profile/order-description-in-profile";
import {
  CHECK_TOKEN,
  GET_USER,
} from "../../services/actions/registration-user";
import { getUser } from "../../utils/utils";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";






export const App = () => {
  const dispatch = useAppDispatch();



    //временная запись
    //localStorage.removeItem("accessToken");


  useEffect(() => {
    dispatch(getIngredients());

    dispatch({ type: CHECK_TOKEN });
    const accessToken = localStorage.getItem("accessToken")
    console.log ("accessToken: " + accessToken)
    if (localStorage.getItem("accessToken")) {
      getUser()
        .then((res) => {
          dispatch({ type: GET_USER, payload: res });
        })
        .catch((err) => console.log(err + "ошибка загагрузки страницы"));
    }
  }, [dispatch]);


  const location = useLocation();
  const background = location.state && location.state.background;
  const navigate = useNavigate();
  const REQUEST2 = useAppSelector(
    (state) => state.orderDetails
  );
  const REQUEST = useAppSelector(
    (state) => state.orderDetails.makeOrderRequestInProgress
  );
  console.log ("REQUEST: "+REQUEST)
  console.log ("REQUEST2: "+REQUEST2)
  function closeIngredientDetailsModal() {
    navigate(-1);
  }





  return (
    <section className={styles.block}>
      <AppHeader />
      {REQUEST && <div className={styles.note}>загрузка...</div>}

      <Routes location={background || location}>
        <Route path={routeHome} element={<HomePage />} />
        

   
       <Route path={routeOrderFeed} element={<OrderFeedPage />} />

        <Route
          path={`${routeOrderFeed}${routeOrderFeedId}`}
          element={<OrderDescription />}
        />

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
          path={routeUser}
          element={<OnlyAuth component={<ProfilePage />} />}
        >
          <Route index element={<ProfileInfoPage />} />
          <Route
            path={routeProfile}
            element={<OnlyAuth component={<ProfileInfoPage />} />}
          />
          <Route
            path={routeUserOrders}
            element={<OnlyAuth component={<UserOrdersPage />} />}
          />
        </Route>

        <Route
          path={`/${routeProfile}/${routeUserOrders}${routeOrderFeedId}`}
          element={<OnlyAuth component={<OrderDescriptionInProfile />} />}
        />
        
        
        <Route
          path={`${routeIngredient}${routeIngredientId}`}
          element={!background ? <Page /> : null}
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
    

          <Route
            path={`${routeOrderFeed}${routeOrderFeedId}`}
            element={
              <OnlyAuth
                component={
                  <Modal closeModal={closeIngredientDetailsModal}>
                    <OrderDescription />
                  </Modal>
                }
              />
            }
          />

          <Route
            path={`/${routeProfile}/${routeUserOrders}${routeOrderFeedId}`}
            element={
              <Modal closeModal={closeIngredientDetailsModal}>
                <OrderDescriptionInProfile />
              </Modal>
            }
          />

        </Routes>
      )}
          
    </section>
  );
};
