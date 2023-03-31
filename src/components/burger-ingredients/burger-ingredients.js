import { useState, useMemo, useContext } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientsContext } from '../../services/ingredientsContext';
import Ingredient from "../ingredient/ingredient";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import styles from "./burger-ingredients.module.css";

const BurgerIngredients = () => {
  const [current, setCurrent] = useState('');
  const [modalActive, setModalActive] = useState(false);
  const [element, setElement] = useState('');
  const { ingredients } = useContext(IngredientsContext)


  const setTab = (tab) => {
    setCurrent(tab)
    const element = document.getElementById(tab)
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }
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
        <Tab value="bun" active={current === "bun"} onClick={setTab}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === "sauce"} onClick={setTab}>
          Соусы
        </Tab>
        <Tab value="main" active={current === "main"} onClick={setTab}>
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

export default BurgerIngredients;
