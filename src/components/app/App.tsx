import { useState, useEffect } from "react";
import AppHeader from "../app-header/app-header";
import styles from "../app/app.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { IngredientsContext } from "../../services/ingredientsContext";
import { API_URL } from "../../utils/config";
import { request } from "../../utils/utils";

function App() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    async function fetchArr() {
      request(`${API_URL}/ingredients`)
        .then((data) => setIngredients(data.data))
        .catch((err) => console.log(err));
    }
    fetchArr();
  }, []);

  return (
    <>
      <AppHeader />
      <IngredientsContext.Provider value={{ ingredients }}>
        <main className={styles.main}>
          {(ingredients.length > 0 && (
            <>
              <BurgerIngredients />
              <BurgerConstructor />
            </>
          )) || <h1>Нет данных</h1>}
        </main>
      </IngredientsContext.Provider>
    </>
  );
}

export default App;
