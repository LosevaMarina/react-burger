import styles from "./home-page.module.css";
import { DndProvider } from "react-dnd";
import { BurgerIngredients } from "../../components/burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../../components/burger-constructor/burger-constructor";
import { HTML5Backend } from "react-dnd-html5-backend";


const HomePage = () => {

  return (
    <>
      <main className={styles.main}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
    </>
  );
}

export { HomePage };