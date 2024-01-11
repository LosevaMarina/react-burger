import styles from "../order-details/order-details.module.css";
import { useAppSelector } from "../../hooks/hooks";

export const OrderDetails = () => {
  const order = useAppSelector(state => state.orderDetails.order);
  console.log ("order: " + order);
  return (

    <div className={styles.container}>
      <h1 className={"text text_type_digits-large" + " " + styles.numberText}>
      {/* {order && order.number}*/}
     {order}
      </h1>
      <p
        className={
          "text text_type_main-medium" + " " + styles.marginsAboveImage
        }
      >
        идентификатор заказа
      </p>
      <div className={styles.image}></div>
      <p className="text text_type_main-default">Ваш заказ начали готовить</p>
      <p
        className={
          "text text_type_main-default text_color_inactive" +
          " " +
          styles.marginsUnderImage
        }
      >
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};
