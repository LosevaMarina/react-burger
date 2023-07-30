import style from './order-feed-page.module.css';

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {connect as connectFeedTable, disconnect as disconnectFeedTable} from '../../services/actions/order-feed';
import { FEED_URL } from "../../utils/utils";

export const OrderFeedPage = () => {

    const {orders } = useSelector(state => state.orderFeedReducer.orders.orders);
    //const { orders } = useSelector(state => state.orders.orders);
    console.log (orders);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(connectFeedTable(FEED_URL))
        return () => {
            dispatch(disconnectFeedTable())
        }
    },[])


    return (
        <section className={style.section}>
            <h2 className="text text_type_main-large">Лента заказов</h2>

            <div className={style.content}>


                <div className={style.list}>
                </div>




                <div className={style.ordersInfo}>
                    <div className={style.ordersAvailability}>
                        <div>
                            <p className="text text_type_main-medium">Готовы:</p>
                            <div className={style.orderNumber}>
                            </div>
                        </div>
                        <div>
                            <p className="text text_type_main-medium">В работе:</p>
                            <div className={style.orderNumber}>
                            </div>
                        </div>
                    </div>

                    <div>
                        <p className="text text_type_main-medium">Выполнено за все время:</p>
                        <p className="text text_type_digits-large"></p>
                    </div>

                    <div>
                        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
                        <p className="text text_type_digits-large"></p>
                    </div>
                </div>

            </div>

        </section>
    )
}