import style from './order-feed-page.module.css';

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {connect as connectFeedTable, disconnect as disconnectFeedTable} from '../../services/actions/ws-actions';
import { FEED_URL } from "../../utils/utils";
import {Order} from "../../components/order/order";

export const OrderFeedPage = () => {

    const { orders, total, totalToday } = useSelector(state => state.orderFeed.orders);
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
            <section className={style.list + " custom-scroll"}>

            {
            orders && orders.map(order => <Order order={order} key={order._id} />)
          }
</section>
                     
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
                        <span className={`${style.shadow} text text_type_digits-large`}>
          {total}
        </span>
                    </div>

                    <div>
                        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
                        <span className={`${style.shadow} text text_type_digits-large`}>{totalToday}</span>
                    </div>
                </div>

            </div>

        </section>
    )
}