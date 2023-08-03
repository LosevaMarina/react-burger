import styles from "./order.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { diffDays, diffToString } from "../../utils/order";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const Order = ({ orders, status }) => {
  const margin = status === "" ? "mt-10" : "";
  const location = useLocation();

  const ingredients = useSelector(
    (store) => store.burgerIngredients.ingredients
  );

  const totalPrice = (burger) => {
    let sum = 0;
    burger.forEach((ing) => {
      if (ing !== null) {
        sum += ingredients.find((el) => el._id === ing).price;
      }
    });
    return sum;
  };
  return (
    <section className={margin}>
      <ul className={styles.items}>
        {orders.map((order) => {
          const _id = order._id;
          const orderDate = new Date(Date.parse(order.createdAt));
          const todayDate = new Date();
          const diffDate = diffDays(orderDate, todayDate);
          const orderMinutes =
            orderDate.getMinutes().toString().length < 2
              ? `0${orderDate.getMinutes()}`
              : orderDate.getMinutes();
          const statusOrder =
            order.status === "done" ? "Выполнен" : "Готовится";
          //console.log("statusOrder:  " + statusOrder);

          return (
            <Link
              key={order.number}
              to={`/feed/${_id}`}
              state={{ background: location }}
              className={styles.order}
            >
              <div className={styles.number}>
                <p className="text text_type_digits-default">#{order.number}</p>
                <p className="text text_type_main-default text_color_inactive">
                  {`${diffToString(
                    diffDate
                  )}, ${orderDate.getHours()}:${orderMinutes}
                        i-GMT${
                          orderDate.getTimezoneOffset() > 0
                            ? `+${orderDate.getTimezoneOffset() / 60}`
                            : orderDate.getTimezoneOffset() / 60
                        }`}
                </p>
              </div>
              <h2 className={`${styles.text} text text_type_main-medium mb-6`}>
                {order.name}
                <span className="text_type_main-small pt-2">
                  {status !== "" && statusOrder}
                </span>
              </h2>
              <div className={styles.price}>
                <ul className={styles.ingredients}>
                  {order.ingredients.map((ingredient, index) => {
                    if (ingredient !== null) {
                      if (index > 0 && index <= 5) {
                        return (
                          <li
                            key={uuidv4()}
                            style={{ zIndex: index }}
                            className={styles.imgEl}
                          >
                            <img
                              src={
                                ingredients.find((el) => el._id === ingredient)
                                  .image_mobile
                              }
                              alt={
                                ingredients.find((el) => el._id === ingredient)
                                  .name
                              }
                              className={styles.image}
                            />
                          </li>
                        );
                      }
                      if (order.ingredients.length > 5) {
                        if (index === 0) {
                          return (
                            <li
                              key={uuidv4()}
                              style={{ zIndex: index }}
                              className={`${styles.imgEl} ${styles.last}`}
                            >
                              <p className={`${styles.textAbout}`}>
                                +{order.ingredients.length - 5}
                              </p>
                              <img
                                src={
                                  ingredients.find(
                                    (el) => el._id === ingredient
                                  ).image_mobile
                                }
                                alt={
                                  ingredients.find(
                                    (el) => el._id === ingredient
                                  ).name
                                }
                                className={styles.image}
                              />
                            </li>
                          );
                        }
                      }
                    }
                  })}
                </ul>
                <div className={styles.price}>
                  <p className="text text_type_digits-default">
                    {totalPrice(order.ingredients)}
                  </p>
                  <CurrencyIcon type="primary" />
                </div>
              </div>
            </Link>
          );
        })}
      </ul>
    </section>
  );
};

export default Order;
