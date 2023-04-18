import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AppHeader from "../app-header/app-header";
import styles from "../app/app.module.css";
//import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
//import BurgerConstructor from "../burger-constructor/burger-constructor";
//import { IngredientsContext } from "../../services/ingredientsContext";
import { getIngredients } from "../../services/actions/burger-ingredients";


export const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
        <main className={styles.main}>
            <>
              <BurgerIngredients />
            </>
        </main>
    </>
  );
}
