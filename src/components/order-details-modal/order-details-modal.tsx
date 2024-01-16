import styles from "./order-details-modal.module.css";
import { IngredientOrder } from "../ingredient-order/ingredient-order";
import {
  FormattedDate,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo } from "react";
import {IIngredientType} from "../../utils/data";
import { useAppSelector } from "../../hooks/hooks";

export const OrderDetailsModal = () => {
 
  const order = useAppSelector(store => store.orderCard.order);
  

  const ingredients = useAppSelector(
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


const arrayWithCounters: any =
ingredientsInfo?.map((a) => {
  const counter = ingredientsInfo.filter(
    (item) => item?._id === a?._id
  ).length;
  return { ...a, counter: counter };
});


const removeDuplicates = () => {
  if (order) {
    const set = new Set<string>(order.ingredients);
    const uniqueId:string[] = [...set];
    return uniqueId.map(
      (item) =>
        arrayWithCounters &&
        arrayWithCounters.find((ing: IIngredientType) => item == ing._id)
    );
  }
};


  let uniqueIngredients: |(IIngredientType | null | undefined)[] | undefined = removeDuplicates();


  return (
    <div className={styles.container}>
     {order && ( <span className={`${styles.number} text text_type_digits-default pb-10`}>
        #{order.number}
      </span>
     )}
     
     
     {order && (
       <p className="text text_type_main-medium pb-3">{order.name}</p>)}



      {order && order.status === "done" ? (
        <p className={styles.status + " text text_type_main-default"}>
          Выполнен
        </p>
      ) : (
        <p className={"text text_type_main-default"}>Готовится</p>
      )}

      <p className="text text_type_main-medium pb-6">Состав:</p>
      <ul className={`custom-scroll ${styles.cart_list}`}>
        {order && uniqueIngredients &&
          uniqueIngredients.map((item, index:number) => (
            item && <IngredientOrder key={index} card={item} />
          ))}
      </ul>
      <div className={`pt-10 ${styles.info_box}`}>
        {order && (
          <span className="text text_type_main-small text_color_inactive">
            {<FormattedDate date={new Date(order.updatedAt)} />}
          </span>
        )}
        <div className={styles.price_box}>
          <p className="text text_type_digits-default">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};
