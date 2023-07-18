import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppHeader } from "../app-header/app-header";
import styles from "../app/app.module.css";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import { getIngredients } from "../../services/actions/burger-ingredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Modal } from "../modal/modal";
import {
  CLOSE_MODAL_INGREDIENT,
  NO_INGREDIENT,
} from "../../services/actions/ingredient-details";
import { CLOSE_ORDER_DETAILS_MODAL } from "../../services/actions/order-details";
import { IngredientDetails } from "../ingredient-details/ingredient-details.jsx";
import { OrderDetails } from "../order-details/order-details";
import { LoginPage } from "../../pages/login-page/login-page";
import { RegisterPage } from "../../pages/register-page/register-page";
import { ForgotPasswordPage } from "../../pages/forgot-password-page/forgot-password-page";
import { ResetPasswordPage } from "../../pages/reset-password-page/reset-password-page";
import { ProfilePage } from "../../pages/profile-page/profile-page";

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);



  const ingredientDetailsModal = useSelector(
    (state) => state.ingredientDetails.openModal
  );

  const orderDetailsModal = useSelector(
    (state) => state.orderDetails.openModal
  );

  const REQUEST = useSelector(
    (state) => state.orderDetails.makeOrderRequestInProgress
  );

  function closeIngredientDetailsModal() {
    dispatch({ type: CLOSE_MODAL_INGREDIENT });
    dispatch({ type: NO_INGREDIENT });
  }

  function closeOrderDetailsModal() {
    dispatch({ type: CLOSE_ORDER_DETAILS_MODAL });
  }

  return (
    <>
      <AppHeader />
      {REQUEST && <div className={styles.note}>загрузка...</div>}

      <main className={styles.main}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
      {ingredientDetailsModal && (
        <Modal closeModal={closeIngredientDetailsModal}>
          <IngredientDetails />
        </Modal>
      )}
      {orderDetailsModal && (
        <Modal closeModal={closeOrderDetailsModal}>
          <OrderDetails />
        </Modal>
      )}


<LoginPage />

<RegisterPage />

<ForgotPasswordPage />

<ResetPasswordPage/>


<ProfilePage />
    </>
  );
};
