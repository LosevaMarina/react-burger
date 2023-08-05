import styles from "./order-description.module.css";
import { OrderDetailsModal } from "../order-details-modal/order-details-modal";
import {
  connect as connectUserFeedTable,
  disconnect as disconnectUserFeedTable,
} from "../../services/actions/ws-profile";

import { ORDERS_URL } from "../../utils/utils";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router";
 
export const OrderDescription = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(connectUserFeedTable(ORDERS_URL));
    //dispatch(connectFeedTable(FEED_URL));
    return () => {
      dispatch(disconnectUserFeedTable());
      //dispatch(disconnectFeedTable());
    };
  }, [dispatch]);

  const { orders } = useSelector((store) => store.orderFeed.orders);

  //const order = orders.find((order) => order._id === id);
  const order = orders.find((order) => order.number === id);

  return (
    <section className={styles.section}>
      {order && <OrderDetailsModal orders={orders} />}
    </section>
  );
};
