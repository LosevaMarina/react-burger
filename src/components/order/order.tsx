import styles from "./order.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router-dom";
import { useMemo,FC } from "react";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppSelector } from "../../hooks/hooks";
import {IOrderInterface, IIngredientType} from "../../utils/data";

interface IOrder {
  order: IOrderInterface;
  status: string;
}





export const Order:FC<IOrder> = ({ order, status }) => {
  const location = useLocation();

  const ingredientsT = order.ingredients;

  const ingredients = useAppSelector(
    (store) => store.burgerIngredients.ingredients
  );

  function findIngredient(ingredient: string | IIngredientType) {
    return ingredients.find((item) => item._id === ingredient) as IIngredientType;
  }

  const ingredientsInfo = ingredientsT.map((item) =>
    ingredients.find((ing) => item == ing._id)
  );



  const totalPrice = useMemo(() => {
    return ingredientsInfo.reduce((sum, item) => {
      return item ? sum + item.price : sum;
    }, 0);
  }, []);

  const margin = status === "" ? "mt-10" : "";
  return (
    <section className={margin}>
      <ul className={styles.items}>
        <Link
          key={order.number}
          to={`/profile/orders/${order.number}`}
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
            <span className="text_type_main-small pt-2">
              {order.status == "done" ? (
                <p
                  className={styles.status_done + " text text_type_main-default"}
                >
                  Выполнен
                </p>
              ) : order.status == "created" ? (
                <p className={styles.status + " text text_type_main-default"}>
                  Создан
                </p>
              ) : (
                <p className={styles.status + " text text_type_main-default"}>
                  Готовится
                </p>
              )}
            </span>
          </h2>
          <div className={styles.price}>
            <ul className={styles.ingredients}>
              {order.ingredients.map((ingredient, index) => {
                if (ingredient !== null) {
                  if (index > 0 && index <= 5) {
                    return (
                      <li
                        //key={uuidv4()}
                        key={index}
                        style={{ zIndex: index }}
                        className={styles.imgEl}
                      >
                        <img
                          src={findIngredient(ingredient)?.image_mobile}
                          alt={findIngredient(ingredient)?.name}
                          className={styles.image}
                        />
                      </li>
                    );
                  }
                  if (order.ingredients.length > 5) {
                    if (index === 0) {
                      return (
                        <li
                          key={index}
                          style={{ zIndex: index }}
                          className={`${styles.imgEl} ${styles.last}`}
                        >
                          <p className={`${styles.textAbout}`}>
                            +{order.ingredients.length - 5}
                          </p>
                          <img
                            src={findIngredient(ingredient)?.image_mobile}
                            alt={findIngredient(ingredient)?.name}
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


