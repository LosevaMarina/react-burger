import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import data from '../utils/data';
import Ingredient from '../ingredient/ingredient';
import styles from './burger-ingredients.module.css';

function BurgerIngredients ({state}) {

    const [current, setCurrent] = React.useState('');

    return (
        <section className={styles.block}>
            <h1 className='text text_type_main-large'>Соберите бургер</h1>
            <div style={{ display: 'flex' }} className={styles.nav}>
                <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
                Булки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
                Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={setCurrent}>
                Начинки
                </Tab>
            </div>

            <div className={styles.lists}>
            <h2 className="text text_type_main-medium">Булки</h2>
            <ul className={styles.list}>
                {state.map((obj) => {
                    if (obj.type === "bun") {
                        return (<Ingredient key={obj._id} {...obj} />)
                    }            
                })}
            </ul>
            <h2 className="text text_type_main-medium">Соусы</h2>
            <ul className={styles.list}>
                {state.map((obj) => {
                    if (obj.type === "sauce") {
                        return (<Ingredient key={obj._id} {...obj} />)
                    }            
                })}
            </ul>
            <h2 className="text text_type_main-medium">Начинки</h2>
            <ul className={styles.list}>
                {state.map((obj) => {
                    if (obj.type === "main") {
                        return (<Ingredient key={obj._id} {...obj} />)
                    }            
                })}
            </ul>    
            </div>
      </section>

    )
}
export default BurgerIngredients;
