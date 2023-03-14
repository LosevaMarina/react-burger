import React from 'react';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import data from '../utils/data';
import styles from './burger-constructor.module.css';

function BurgerConstructor () {
  console.log(data.length);
        return (
          <div className={styles.block}>
            <div className={styles.element}>
                <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={data[0].name}
                  price={data[0].price}
                  thumbnail={data[0].image}
                />            
            </div>
            <ul className={styles.list}>
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
            </ul>
            <div className={styles.element}>
            <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={data[0].name}
                  price={data[0].price}
                  thumbnail={data[0].image}
                /> 
            </div>
            <div className={styles.sum}>
              <p className="text text_type_digits-medium">610</p>
              <CurrencyIcon type="primary" />
              <Button htmlType="button" type="primary" size="large">
                Оформить заказ
              </Button>
            </div>
          </div>
        )
      }





export default BurgerConstructor;


