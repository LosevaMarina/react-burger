import styles from "./order-description-in-profile.module.css";
import { OrderDetailsModal } from "../../components/order-details-modal/order-details-modal";
import {
  connect as connectFeedTable,
  disconnect as disconnectFeedTable,
} from "../../services/actions/ws-actions";
import { FEED_URL } from "../../utils/utils";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router";

export const OrderDescriptionInProfile = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
 
  useEffect(() => {
    dispatch(connectFeedTable(FEED_URL));
    return () => {
      dispatch(disconnectFeedTable());
    };
  }, []);

  const { orders } = useSelector((store) => store.orderFeed.orders);

  //const order = orders.find((order) => order._id === id);
  const order = orders.find((order) => order.number === id);

  return (
    <section className={styles.section}>
      {order && <OrderDetailsModal orders={orders} />}
    </section>
  );
};
