import React from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-constructor.module.css';

function BurgerConstructor () {
        return (
            <div className={styles.block}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text="Краторная булка N-200i (верх)"
              price={200}

            />
            <ConstructorElement
              text="Краторная булка N-200i (верх)"
              price={50}

            />
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text="Краторная булка N-200i (низ)"
              price={200}
              
            />
          </div>

          </div>
        )
      }





export default BurgerConstructor;


