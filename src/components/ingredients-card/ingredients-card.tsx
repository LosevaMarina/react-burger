import styles from "./ingredients-card.module.css";
import PropTypes from "prop-types";
import { PropTypeingredients } from "../../utils/data";
import { IngredientCard } from "../ingredient-card/ingredient-card";
import { FillingCard } from "../filling-card/filling-card";
import {IIngredientType} from "../../utils/data";
import { FC } from "react";



interface IIngredientsCard {
  ingredients: Array<IIngredientType>;
}


export const IngredientsCard: FC<IIngredientsCard> = ({ ingredients }) => {
  return ingredients.length === 0 ? (
    <div className={styles.list}>
      <FillingCard />
    </div>
  ) : (
    <div className={styles.list}>
      {ingredients.map((item: any = {}, index: number) => {
        return (
          <IngredientCard item={item.ingredient} index={index} key={item.key} />
        );
      })}
    </div>
  );
};
