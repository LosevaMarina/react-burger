import { useState, useMemo, useRef } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import { IngredientsBlock } from "./ingredients-block";
import {
  OPEN_MODAL_INGREDIENT,
  selectIngredient,
} from "../../services/actions/ingredient-details";
import { useDispatch, useSelector } from "react-redux";
import {useTypeSelector} from "../../hooks/use-type-selector";
import {IIngredientType} from "../../utils/data";




export const BurgerIngredients = () => {
  const { ingredients } = useTypeSelector((state) => state.burgerIngredients);

  const dispatch = useDispatch();

  const [current, setCurrent] = useState<string>("bun");

  const bunRef = useRef<HTMLDivElement>(null);
  const sauceRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  
  const sauceRefCur = sauceRef.current as HTMLElement;
  const bunRefCur = bunRef.current as HTMLElement
  const mainRefCur = mainRef.current as HTMLElement


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


  function setTab(tab: any) {
    setCurrent(tab);
    
    switch (tab) {
      case "bun":
          bunRefCur.scrollIntoView({
          behavior: "smooth",
        });    
        break;
      case "sauce":
        sauceRefCur.scrollIntoView({
          behavior: "smooth",
        });
        break;
      case "main":
        mainRefCur.scrollIntoView({
          behavior: "smooth",
        });
        break;
      default:
        break;
    }
  }


  function onScroll(event: any) {
    const scrolling = event.target.scrollTop;

    const sauceScrolling =
    sauceRefCur.getBoundingClientRect().top -
    bunRefCur.getBoundingClientRect().top;
    const mainScrolling =
    mainRefCur.getBoundingClientRect().top -
    bunRefCur.getBoundingClientRect().top;

    if (scrolling > mainScrolling) {
      setCurrent("main");
    } else if (scrolling <= sauceScrolling) {
      setCurrent("bun");
    } else {
      setCurrent("sauce");
    }
  }




  const openModalIngredientCard = (ingredient: IIngredientType) => {
    dispatch(selectIngredient(ingredient));
    dispatch({
      type: OPEN_MODAL_INGREDIENT,
    });
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
          onClick={openModalIngredientCard}
        />
        <IngredientsBlock
          ref={sauceRef}
          title="Соусы"
          ingredients={sauces}
          onClick={openModalIngredientCard}
        />
        <IngredientsBlock
          ref={mainRef}
          title="Начинки"
          ingredients={mains}
          onClick={openModalIngredientCard}
        />
      </div>
    </section>
  );
};






{/*
import { useState, useMemo, useRef } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import { IngredientsBlock } from "./ingredients-block";
import {
  OPEN_MODAL_INGREDIENT,
  selectIngredient,
} from "../../services/actions/ingredient-details";
import { useDispatch, useSelector } from "react-redux";

export const BurgerIngredients = () => {
  const { ingredients } = useSelector((state) => state.burgerIngredients);
  
 

  const dispatch = useDispatch();

  const [current, setCurrent] = useState("bun");

  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);


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

function setTab(tab) {
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

function onScroll(event) {
  const scrolling = event.target.scrollTop;

  const sauceScrolling =
    sauceRef.current.getBoundingClientRect().top -
    bunRef.current.getBoundingClientRect().top;
  const mainScrolling =
    mainRef.current.getBoundingClientRect().top -
    bunRef.current.getBoundingClientRect().top;

  if (scrolling > mainScrolling) {
    setCurrent("main");
  } else if (scrolling <= sauceScrolling) {
    setCurrent("bun");
  } else {
    setCurrent("sauce");
  }
}

const openModalIngredientCard = (ingredient) => {
  dispatch(selectIngredient(ingredient));
  dispatch({
    type: OPEN_MODAL_INGREDIENT,
  });
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
        onClick={openModalIngredientCard}
      />
      <IngredientsBlock
        ref={sauceRef}
        title="Соусы"
        ingredients={sauces}
        onClick={openModalIngredientCard}
      />
      <IngredientsBlock
        ref={mainRef}
        title="Начинки"
        ingredients={mains}
        onClick={openModalIngredientCard}
      />
    </div>
  </section>
);
};
*/}