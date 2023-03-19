import React from 'react';
import { ConstructorElement, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import data from '../utils/data';
import styles from './burger-constructor.module.css';

function BurgerConstructor () {
        return (
          <section className={styles.block}>
            <ul className = {styles.listElements}>
            <li className={styles.element}>
                <ConstructorElement
                  type="top"
                  isLocked={true}
                  text="Краторная булка N-200i (верх)"
                  price={data[0].price}
                  thumbnail={data[0].image}
                />            
            </li>
            <div className={styles.list}>
              {data.map((obj) => (                   
                <li key={obj._id} className={styles.listItem}>
                  <div className={styles.points}></div>
                  <ConstructorElement
                    text={obj.name}
                    price={obj.price}
                    thumbnail={obj.image}
                  />     
                </li>   
            ))}
            </div>       
            <li className={styles.element}>
            <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text="Краторная булка N-200i (низ)"
                  price={data[0].price}
                  thumbnail={data[0].image}
                /> 
            </li>
           </ul>

            <div className={styles.order}>
              <div className={styles.sum}>
                <p className="text text_type_digits-medium">610</p>
                <div className={styles.subtract}></div>
              </div>
              <Button htmlType="button" type="primary" size="large">
                Оформить заказ
              </Button>
            </div>
          </section>
        )
      }
export default BurgerConstructor;


