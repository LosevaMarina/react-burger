import { forwardRef } from "react";
import styles from "./burger-ingredients.module.css";
import { Ingredient } from "../ingredient/ingredient";
import {IIngredientType} from "../../utils/data";



interface IIngredientsBlock {
  onClick: (ingredient: IIngredientType) => void;
  ingredients: any[];
  title: string;
}


export const IngredientsBlock = forwardRef<HTMLDivElement, IIngredientsBlock>(
  ({ title, ingredients, onClick }, ref) => {
    return (
      <>
        <h2 ref={ref} className="text text_type_main-medium">
          {title}
        </h2>
        <ul className={styles.list}>
          {ingredients.map((ingredient) => {
            return (
              <Ingredient
                key={ingredient._id}
                ingredient={ingredient}
                onClick={onClick}
              ></Ingredient>
            );
          })}
        </ul>
      </>
    );
  }
);