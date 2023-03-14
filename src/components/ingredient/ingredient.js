import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient.module.css';


function Ingredient({ image, name, price, _id }) {
    return (
        <li className={styles.listItem} key={_id}>
            <Counter count={1} size="default" extraClass="m-1" />
            <img src={image} alt={name} />
            <div className={styles.price}>
                <p className='text text_type_digits-default'>{price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className="text text_type_main-default">{name}</p>
        </li>


    );
}
export default Ingredient;