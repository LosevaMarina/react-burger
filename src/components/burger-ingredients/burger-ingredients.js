import { useState, useMemo, useContext } from "react";
import PropTypes from "prop-types";
import {PropTypeingredients} from '../utils/data';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientsContext } from '../services/ingredientsContext';
import Ingredient from "../ingredient/ingredient";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import styles from "./burger-ingredients.module.css";

const BurgerIngredients = () => {
  const [current, setCurrent] = useState('');
  const [modalActive, setModalActive] = useState(false);
  const [element, setElement] = useState('');
  const { ingredients } = useContext(ingredientsContext)



  const openModal = (obj) => {
    setModalActive(true);

    setElement(obj);
  };

  const closeModal = () => {
    setModalActive(false);
  };
  const buns = useMemo(
    () => ingredients.filter((item) => item.type === "bun").map((item) => item),
    [ingredients]
  );
  const sauces = useMemo(
    () => ingredients.filter((item) => item.type === "sauce").map((item) => item),
    [ingredients]
  );

  const mains = useMemo(
    () => ingredients.filter((item) => item.type === "main").map((item) => item),
    [ingredients]
  );



  return (
    <section className={styles.block}>
      {modalActive &&
        <Modal closeModal={closeModal}>
          <IngredientDetails ingredient={element} />
        </Modal>
      }
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <div style={{ display: "flex" }} className={styles.nav}>
        <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === "main"} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>

      <div className={styles.lists}>
        <h2 className="text text_type_main-medium">Булки</h2>
        <ul className={styles.list}>
        {buns.map((obj) => (
            <Ingredient
              key={obj._id}
              name={obj.name}
              image={obj.image}
              price={obj.price}
              openModal={() => openModal(obj)} 
            />
          ))}
        </ul>
        <h2 className="text text_type_main-medium">Соусы</h2>
        <ul className={styles.list}>
        {sauces.map((obj) => (
            <Ingredient
              key={obj._id}
              name={obj.name}
              image={obj.image}
              price={obj.price}
              openModal={() => openModal(obj)} 
            />
          ))}
        </ul>
        <h2 className="text text_type_main-medium">Начинки</h2>
        <ul className={styles.list}>
        {mains.map((obj) => (
            <Ingredient
              key={obj._id}
              name={obj.name}
              image={obj.image}
              price={obj.price}
              openModal={() => openModal(obj)} 
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypeingredients).isRequired,
};

export default BurgerIngredients;
