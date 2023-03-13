import BurgerIngredients from '../burger-ingredients/burger-ingredients';

import styles from './main.module.css';


function Main() {
  return (
    <main className={ styles.main }>
      <BurgerIngredients />
      
    </main>
  );
}

export default Main;