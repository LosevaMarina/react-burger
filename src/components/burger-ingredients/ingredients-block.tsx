import { forwardRef, RefObject, ForwardedRef } from "react";
import styles from "./burger-ingredients.module.css";
import PropTypes from "prop-types";
import { PropTypeingredients } from "../../utils/data";
import { Ingredient } from "../ingredient/ingredient";
import { FC } from "react";
import {IIngredientType} from "../../utils/data";
import {useTypeSelector} from "../../hooks/use-type-selector";



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