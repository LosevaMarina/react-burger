import React from 'react';
import AppHeader from '../app-header/app-header';
import styles from '../app/app.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';


function App() {
  const [state, setState] = React.useState([]);

  React.useEffect(() => {
    async function fetchArr() {
      return await fetch('https://norma.nomoreparties.space/api/ingredients')
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`ВНИМАНИЕ, ТЫ ОШИБЛАСЬ ${res.status}`);
        })
        .then((data) => setState(data.data))
        .catch((err) => console.log(err));
    }
    fetchArr();
  }, []);


  return (
    <>
      <AppHeader />
      <main className={ styles.main }>
      <BurgerIngredients state={state}/>
      <BurgerConstructor state={state}/>
    </main>
    </>
  );

  
}


export default App;
