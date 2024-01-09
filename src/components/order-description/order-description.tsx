import styles from "./order-description.module.css";
import { OrderDetailsModal } from "../order-details-modal/order-details-modal";
import {getOrderCard} from "../../services/actions/order-card";
import {
  connect as connectFeedTable,
  disconnect as disconnectFeedTable,
} from "../../services/actions/ws-actions";
import { FEED_URL } from "../../utils/utils";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

 
export const OrderDescription = () => {
  const dispatch = useAppDispatch();
  const {id} = useParams<string>();
  const order = useAppSelector(store => store.orderCard.order);

  useEffect(() => {
    dispatch(connectFeedTable(FEED_URL));
    //dispatch(getOrderCard(id))
    id && dispatch(getOrderCard(id));
    return () => {
      dispatch(disconnectFeedTable());
    };
  }, [dispatch]);

  return (
     
    <section className={styles.section}>
      {order && <OrderDetailsModal />}
    </section>
  );
};
