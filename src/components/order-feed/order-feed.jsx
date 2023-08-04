import styles from "./order-feed.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useMemo } from "react";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";

export const OrderFeed = ({ order, status }) => {
  const location = useLocation();

  const ingredientsT = order.ingredients;

  const ingredients = useSelector(
    (store) => store.burgerIngredients.ingredients
  );

  const ingredientsInfo = ingredientsT.map((item) =>
    ingredients.find((ing) => item == ing._id)
  );


  const totalPrice = useMemo(() => {
    return ingredientsInfo.reduce((sum, item) => {
      return item ? sum + item.price : sum;
    }, 0);
  }, []);

  const margin = status === "" ? "mt-10" : "";
  const _id = order._id;
  return (
    <section className={margin}>
      <ul className={styles.items}>
        <Link
          key={order.number}
          to={`/feed/${_id}`}
          state={{ background: location }}
          className={styles.order}
        >
          <div className={styles.number}>
            <p className="text text_type_digits-default">#{order.number}</p>
            <p className="text text_type_main-default text_color_inactive">
              {<FormattedDate date={new Date(order.updatedAt)} />}
            </p>
          </div>
          <h2 className={`${styles.text} text text_type_main-medium mb-6`}>
            {order.name}
           
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
                            ingredients.find((el) => el._id === ingredient).name
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
                  }
                }
              })}
            </ul>
            <div className={styles.price}>
              <p className="text text_type_digits-default">{totalPrice}</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </Link>
      </ul>
    </section>
  );
};