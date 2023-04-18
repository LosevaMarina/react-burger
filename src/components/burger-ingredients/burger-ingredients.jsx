import { useState, useMemo, useRef } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
//import { IngredientsContext } from "../../services/ingredientsContext";
//import Ingredient from "../ingredient/ingredient";
//import IngredientDetails from "../ingredient-details/ingredient-details";
//import Modal from "../modal/modal";
import styles from "./burger-ingredients.module.css";
import { IngredientsBlock } from "./ingredients-block";
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
  const [current, setCurrent] = useState("bun");

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

  function setTab (tab) {
    setCurrent(tab);
    switch (tab) {
      case "bun":
        bunRef.current.scrollIntoView({
          behavior: "smooth",
        });
        break;
      case "sauce":
        sauceRef.current.scrollIntoView({
          behavior: "smooth",
        });
        break;
      case "main":
          mainRef.current.scrollIntoView({
            behavior: "smooth",
          });
        break;
      default:
        break;
    }
  }

  function onScroll (event) {
    const scrolling = event.target.scrollTop;

    const sauceScrolling = sauceRef.current.getBoundingClientRect().top - bunRef.current.getBoundingClientRect().top;
    const mainScrolling = mainRef.current.getBoundingClientRect().top - bunRef.current.getBoundingClientRect().top;

    if (scrolling > mainScrolling) {
      setCurrent("main");
    } else if (scrolling <= sauceScrolling) {
      setCurrent("bun");
    } else {
      setCurrent("sauce");
    }
  }



  const openModal = () => {
  };




  return (
    <section className={styles.block}>
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <div className={styles.nav}>
        <Tab active={current === "bun"} value={"bun"} onClick={setTab}>
          Булки
        </Tab>
        <Tab active={current === "sauce"} value={"sauce"} onClick={setTab}>
          Соусы
        </Tab>
        <Tab active={current === "main"} value={"main"} onClick={setTab}>
          Начинки
        </Tab>
      </div>

      <div className={styles.lists} onScroll={onScroll}>
      <IngredientsBlock
          ref={bunRef}
          title="Булки"
          ingredients={buns}
          onClick={openModal}
        />
      <IngredientsBlock
          ref={sauceRef}
          title="Соусы"
          ingredients={sauces}
          onClick={openModal}
        />
      <IngredientsBlock
          ref={mainRef}
          title="Начинки"
          ingredients={mains}
          onClick={openModal}
        />
      </div>
    </section>
  );
}