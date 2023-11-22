import style from "./ingredient-order.module.css";
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from "react";

type TIngredientOrder = {
  card: any;
}


export const IngredientOrder: FC<TIngredientOrder> =  ({ card }) => {
  return (
    <div className={style.container}>
      <div className={style.ingredient}>
        {card && <img className={style.ingredient_image} src={card.image} />}
        {card && <p className="text text_type_main-small">{card.name}</p>}
      </div>
      <div className={style.price + " text text_type_digits-default"}>
        {card && <p className={style.numbers}>{card.counter}&nbsp;x&nbsp;{card.price}&nbsp;</p>}
        <CurrencyIcon type="primary" />
      </div>
    </div>
  )
}

