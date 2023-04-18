import { useState, useMemo, useContext, useRef } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientsContext } from "../../services/ingredientsContext";
import Ingredient from "../ingredient/ingredient";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import styles from "./burger-ingredients.module.css";


import { useDispatch, useSelector } from "react-redux";

{/*
const BurgerIngredients = () => {
  const [current, setCurrent] = useState("");
  const [modalActive, setModalActive] = useState(false);
  const [element, setElement] = useState("");
  const { ingredients } = useContext(IngredientsContext);

  const setTab = (tab) => {
    setCurrent(tab);
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };
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
    () =>
      ingredients.filter((item) => item.type === "sauce").map((item) => item),
    [ingredients]
  );

  const mains = useMemo(
    () =>
      ingredients.filter((item) => item.type === "main").map((item) => item),
    [ingredients]
  );

  return (
    <section className={styles.block}>
      {modalActive && (
        <Modal closeModal={closeModal}>
          <IngredientDetails ingredient={element} />
        </Modal>
      )}
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <div className={styles.nav}>
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
*/}
export const BurgerIngredients = () => {
  const { ingredients } = useSelector((state) => state.burgerIngredients);
  //const dispatch = useDispatch();
  const [current, setCurrent] = useState("");
  

  const buns = useMemo(
    () => ingredients.filter((item) => item.type === "bun").map((item) => item),
    [ingredients]
  );
  const sauces = useMemo(
    () =>
      ingredients.filter((item) => item.type === "sauce").map((item) => item),
    [ingredients]
  );

  const mains = useMemo(
    () =>
      ingredients.filter((item) => item.type === "main").map((item) => item),
    [ingredients]
  );

  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);

  function onTabClick(tab) {
    setCurrent(tab);
    switch (tab) {
      case "bun":
        scrollTo(bunRef);
        break;
      case "sauce":
        scrollTo(sauceRef);
        break;
      case "main":
        scrollTo(mainRef);
        break;
      default:
        break;
    }
  }

  const scrollTo = (ref) => {
    ref.current.scrollIntoView({
      behavior: "smooth",
    });
  };



  const openModal = () => {
  };




  return (
    <section className={styles.block}>
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <div className={styles.nav}>
      <Tab value='Булки' active={current === 'Булки'} onClick={onTabClick}>
        Булки
      </Tab>
      <Tab value='Соусы' active={current === 'Соусы'} onClick={onTabClick}>
        Соусы
      </Tab>
      <Tab value='Начинки' active={current === 'Начинки'} onClick={onTabClick}>
        Начинки
      </Tab>
      </div>


      <div className={styles.lists}>
        <h2 className="text text_type_main-medium" ref={bunRef}>Булки</h2>
        <ul className={styles.list}>
          {buns.map((ingredient) => (
            <Ingredient
              key={ingredient._id}
              ingredient={ingredient}
              onClick={openModal}
            />
          ))}
        </ul>
        <h2 className="text text_type_main-medium" ref={sauceRef}>Соусы</h2>
        <ul className={styles.list}>
          {sauces.map((ingredient) => (
            <Ingredient
              key={ingredient._id}
              ingredient={ingredient}
              onClick={openModal}
            />
          ))}
        </ul>
        <h2 className="text text_type_main-medium" ref={mainRef}>Начинки</h2>
        <ul className={styles.list}>
          {mains.map((ingredient) => (
            <Ingredient
              key={ingredient._id}
              ingredient={ingredient}
              onClick={openModal}
            />
          ))}


        </ul>
      </div>
    </section>
  );

  

}