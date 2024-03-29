import style from "./user-orders-page.module.css";
import {Order} from "../../components/order/order";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  connect as connectUserFeedTable,
  disconnect as disconnectUserFeedTable, 
} from "../../services/actions/ws-profile";

import { FEED_URL, ORDERS_URL } from "../../utils/utils";

import {
  connect as connectFeedTable,
  disconnect as disconnectFeedTable,
} from "../../services/actions/ws-actions";

export const UserOrdersPage = () => {
  const { orders } = useSelector((store) => store.orderFeed.orders);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(connectUserFeedTable(ORDERS_URL));
    //dispatch(connectFeedTable(FEED_URL));
    return () => {
      dispatch(disconnectUserFeedTable());
     // dispatch(disconnectFeedTable());
    };
  }, [dispatch]);


  return (
    <section className={`${style.list} custom-scroll`}>
      {
        orders && orders.map(order => <Order order={order} key={order._id} />)
      }
    </section>
  ); 
};
