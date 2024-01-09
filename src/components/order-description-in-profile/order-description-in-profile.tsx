import styles from "./order-description-in-profile.module.css";
import { OrderDetailsModal } from "../../components/order-details-modal/order-details-modal";
import {
  connect as connectUserFeedTable,
  disconnect as disconnectUserFeedTable,
} from "../../services/actions/ws-profile";
import { ORDERS_URL } from "../../utils/utils";
import { useEffect } from "react";
import { useParams } from "react-router";
import {getOrderCard} from "../../services/actions/order-card";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

export const OrderDescriptionInProfile = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  //const { id } = useParams<string>();
  const order = useAppSelector(store => store.orderCard.order);

  useEffect(() => {
    dispatch(connectUserFeedTable(ORDERS_URL));
    id && dispatch(getOrderCard(id))
    return () => {
      dispatch(disconnectUserFeedTable());
    };
  }, [dispatch]);


  return (
    <section className={styles.section}>
      {order && <OrderDetailsModal />}
    </section>
  );
};