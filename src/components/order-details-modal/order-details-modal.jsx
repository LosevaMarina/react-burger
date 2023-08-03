import styles from "./order-details-modal.module.css";
import { IngredientOrder } from "../ingredient-order/ingredient-order";
import {
  FormattedDate,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { useMemo } from "react";

export const OrderDetailsModal = ({ orders }) => {
  const { id } = useParams();

  const order = orders.find((order) => order._id === id);

  const { name, number, createdAt, ingredient, status } = order;

  const ingredients = useSelector(
    (state) => state.burgerIngredients.ingredients
  );

  const ingredientsInfo =
    order &&
    order.ingredients.map((item) => ingredients.find((ing) => item == ing._id));

  const totalPrice = useMemo(() => {
    return (
      ingredientsInfo &&
      ingredientsInfo.reduce((sum, item) => {
        return item ? sum + item.price : sum;
      }, 0)
    );
  }, [ingredientsInfo]);

  const setTextColor = () => {
    if (status === "done") {
      return `text text_type_main-default pb-15 ${styles.done}`;
    } else if (status === "created") {
      return `text text_type_main-default pb-15 ${styles.created}`;
    } else if (status === "pending") {
      return `text text_type_main-default pb-15 ${styles.created}`;
    }
  };

  let uniqueIngredients;
  const arrayWithCounters =
    ingredientsInfo &&
    ingredientsInfo.map((a) => {
      const counter = ingredientsInfo.filter(
        (item) => item._id === a._id
      ).length;
      return { ...a, counter: counter };
    });

  if (order) {
    const set = new Set(order.ingredients);
    const uniqueId = [...set];
    uniqueIngredients = uniqueId.map((item) =>
      arrayWithCounters.find((ing) => item == ing._id)
    );
  }

  return (
    <div className={styles.container}>
      <span className={`${styles.number} text text_type_digits-default pb-10`}>
        #{number}
      </span>
      <p className="text text_type_main-medium pb-3">{name}</p>
      <p className={setTextColor()}>
        {status === "done" ? "Выполнен" : "Готовится"}
      </p>
      <p className="text text_type_main-medium pb-6">Состав:</p>
      <ul className={`custom-scroll ${styles.cart_list}`}>
        {order &&
          uniqueIngredients.map((item, index) => (
            <IngredientOrder key={index} card={item} />
          ))}
      </ul>
      <div className={`pt-10 ${styles.info_box}`}>
        <span className="text text_type_main-small text_color_inactive">
          <FormattedDate date={new Date(createdAt)} />
        </span>
        <div className={styles.price_box}>
          <p className="text text_type_digits-default">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};
