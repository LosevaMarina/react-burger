import style from "./user-orders-page.module.css";
import { Order } from "../../components/order/order";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  connect as connectUserFeedTable,
  disconnect as disconnectUserFeedTable
} from "../../services/actions/ws-profile";

import { FEED_URL, ORDERS_URL } from "../../utils/utils";

import {
  connect as connectFeedTable,
  disconnect as disconnectFeedTable,
} from "../../services/actions/ws-actions";




export const UserOrdersPage = () => {
  const {orders} = useSelector((state) => state.userFeed.orders);
  const UserAuth = Boolean(
    localStorage.getItem('accessToken')
  );
  
    console.log("проверка токена в истории заказов пользователя: " + UserAuth);

  
  
  const wsUrlFeed = "wss://norma.nomoreparties.space/orders/all";
  const accessToken = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken').slice(7) : '';
  //const accessToken = localStorage.getItem("accessToken").split(' ')[1];
  const wsUrlUserFeed = `wss://norma.nomoreparties.space/orders?token=${accessToken}`;
  

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(connectUserFeedTable(wsUrlUserFeed));
    //dispatch(connectFeedTable(wsUrlFeed));
    return () => {
      dispatch(disconnectUserFeedTable());
      //dispatch(disconnectFeedTable());
    };
  }, [dispatch]);

 

  console.log (useSelector((state) => state.userFeed.status));



  return (
    <section className={`${style.itemsFeed} custom-scroll`}>

    {orders && orders.map((item, i) => <Order key={i} order={item}/>)}


    </section>
  );
};




















