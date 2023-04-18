import React, { forwardRef } from "react";
import styles from "./burger-ingredients.module.css";
import PropTypes from "prop-types";
import { PropTypeingredients } from "../../utils/data";
import { Ingredient } from "../ingredient/ingredient";



export const IngredientsBlock = forwardRef (
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
              >
              </Ingredient>
            );
          })}
        </ul>
      </>
    );
  }
);

IngredientsBlock.propTypes = {
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypeingredients.isRequired).isRequired,
  onClick: PropTypes.func.isRequired,
};