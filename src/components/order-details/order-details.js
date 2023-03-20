import React from 'react';
import styles from '../order-details/order-details.module.css'

function OrderDetails() {
    return (
        <div className={styles.container}> 
            <h1>034536</h1>
            <p>идентификатор заказа</p>
            <div className={styles.image}></div>
            <p>Ваш заказ начали готовить</p>
            <p>Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

export default OrderDetails;

