import style from "./user-orders-page.module.css";
import {Order} from "../../components/order/order";
import { useEffect } from "react";
import {
  connect as connectUserFeedTable,
  disconnect as disconnectUserFeedTable, 
} from "../../services/actions/ws-profile";
import {IOrderInterface } from "../../utils/data";
import { FEED_URL, ORDERS_URL } from "../../utils/utils";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  connect as connectFeedTable,
  disconnect as disconnectFeedTable,
} from "../../services/actions/ws-actions";


export const UserOrdersPage = () => {
  const orders = useAppSelector((store) => store.orderFeed.orders);

  const dispatch = useAppDispatch();

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
        orders && orders.map((order: IOrderInterface) => <Order order={order} key={order._id} status="" />)
      }
    </section>
  ); 
};