import { useSelector } from "react-redux";
import style from "./order.module.css";
import { OrderIngredient } from "../order-ingredient/order-ingredient";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {React, useMemo} from "react";
import { Link, useLocation } from "react-router-dom";

export const Order = ({ order }) => {
  const location = useLocation();

  const ingredientsOrder = order.ingredients;
  console.log("order.ingredients:  " + ingredientsOrder);

  const { ingredients } = useSelector((store) => store.burgerIngredients);
  console.log("ingredients:  " + ingredients);

  const ingredientsInfo = ingredientsOrder.map((item) =>
    ingredients.find((ing) => item == ing._id)
  );
  console.log("ingredientsInfo:  " + ingredientsInfo);

  const totalPrice = useMemo(() => {
    return ingredientsInfo.reduce((sum, item) => {
      return item ? sum + item.price : sum;
    }, 0);
  }, []);
  console.log("ЦЕНА:  " + totalPrice);
  console.log("КОНЕЦ ЗАКАЗА:  ");

  let visible;
  let hiden;

  if (ingredientsOrder.length > 6) {
    visible = ingredientsInfo.slice(0, 5);
    hiden = ingredientsOrder.length - 6;
  }
  const numberId = order.number
  return (
    <Link
      to={`/profile/orders/${numberId}`}
      state={{ background: location }}
      className={style.order}
    >
      <div className={style.order_number}>
        <p className="text text_type_digits-default">{order.number}</p>
        <p className="text text_type_main-small text_color_inactive">
          {<FormattedDate date={new Date(order.updatedAt)} />}
        </p>
      </div>
      <div>
        <h3 className={style.order_name + " text text_type_main-medium"}>
          {order.name}
        </h3>
        {order.status == "done" ? (
          <p className={style.status_done + " text text_type_main-default"}>
            Выполнен
          </p>
        ) : order.status == "created" ? (
          <p className={style.status + " text text_type_main-default"}>
            Создан
          </p>
        ) : (
          <p className={style.status + " text text_type_main-default"}>
            Готовится
          </p>
        )}
      </div>
      <div className={style.box_ingredients}>
        <div className={style.ingredients}>
          {!visible &&
            ingredientsInfo.map((item, index) => (
              <OrderIngredient key={index} card={item} />
            ))}
          {visible &&
            visible.map((item, index) => (
              <OrderIngredient key={index} card={item} />
            ))}
          {visible && (
            <div className={style.hidden_elements}>
              <OrderIngredient key={5} card={ingredientsInfo[5]} />
              <p className={style.layer + " text text_type_main-default"}>
                +{hiden}
              </p>
            </div>
          )}
        </div>
        <div className={style.total_price}>
          <p className="text text_type_digits-default">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </Link>
  );
};







