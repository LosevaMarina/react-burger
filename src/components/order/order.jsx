import style from './order.module.css';
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router-dom";

export const Order = (props) => {

    
    const {name, number, ingredients, updatedAt} = props.order;

    const location = useLocation();

    const numberId = props.order['number'];
    


    return (
        <Link to={`${location.pathname}/${numberId}`} state={{ background: location }} className={style.link}>
            <div className={style.wrapperOrder}>
                <div className={style.wrapperDate}>
                    <p className="text text_type_digits-default">{`#${number}`}</p>
                    <p className="text text_type_main-default text_color_inactive">
                        <FormattedDate date={new Date(updatedAt)} />
                    </p>
                </div>
                <p className="text text_type_main-medium">{name}</p>
                <div className={style.wrapperIngredients}>
                    <div className={style.wrapperImg}>
                        

                    </div>
                    <div className={style.wrapperPrice}>
                        <p className="text text_type_digits-default">стоимость</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </div>
        </Link>
    )
}