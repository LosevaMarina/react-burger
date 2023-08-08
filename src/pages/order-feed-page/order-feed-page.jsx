import style from "./order-feed-page.module.css";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  connect as connectFeedTable,
  disconnect as disconnectFeedTable,
} from "../../services/actions/ws-actions";
import { FEED_URL } from "../../utils/utils";
import {OrderFeed} from "../../components/order-feed/order-feed";

export const OrderFeedPage = () => {
  const dispatch = useDispatch(); 
  

  const { orders, total, totalToday } = useSelector(store => store.orderFeed.orders);




  useEffect(() => {
    dispatch(connectFeedTable(FEED_URL));
    return () => {
      dispatch(disconnectFeedTable());
    };
  }, []);
  

  const done =
    orders &&
    orders
      .map((item) => {
        if (item.status === "done") {
          return item.number;
        }
      })
      .slice(0, 5);
      
  const pending =
    orders &&
    orders
      .map((item) => {
        if (item.status === "pending") {
          return item.number;
        }
      })
      .slice(0, 5);

  return (
    <section className={style.section}>
      <h2 className="text text_type_main-large">Лента заказов</h2>

      <div className={style.content}>
        <section className={style.list + " custom-scroll"}>
           
        {
            orders && orders.map(order => <OrderFeed order={order} key={order._id} />)
          }

        </section>

        <div className={style.ordersInfo}>
          <div className={style.ordersAvailability}>
            <div>
              <p className="text text_type_main-medium">Готовы:</p>
              <div className={style.orderNumber}>
                {orders &&
                  done &&
                  done.map((item, i) => (
                    <p 
                      key={i}
                      className="text text_type_digits-default text_color_inactive"
                    >
                      {item}
                    </p>
                  ))}
              </div>
            </div>
            <div>
              <p className="text text_type_main-medium">В работе:</p>
              <div className={style.orderNumber}>
                {orders &&
                  pending &&
                  pending.map((item, i) => (
                    <p
                      key={i}
                      className="text text_type_digits-default text_color_inactive"
                    >
                      {item}
                    </p>
                  ))}
              </div>
            </div>
          </div>

          <div>
            <p className="text text_type_main-medium">
              Выполнено за все время:
            </p>
            <span className={`${style.shadow} text text_type_digits-large`}>
              {total}
            </span>
          </div>

          <div>
            <p className="text text_type_main-medium">Выполнено за сегодня:</p>
            <span className={`${style.shadow} text text_type_digits-large`}>
              {" "}
              {totalToday}{" "}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
