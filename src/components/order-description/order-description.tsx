import styles from "./order-description.module.css";
import { OrderDetailsModal } from "../order-details-modal/order-details-modal";
import {getOrderCard} from "../../services/actions/order-card";
import {
  connect as connectFeedTable,
  disconnect as disconnectFeedTable,
} from "../../services/actions/ws-actions";
import { FEED_URL } from "../../utils/utils";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router";
import {useTypeSelector} from "../../hooks/use-type-selector";

 
export const OrderDescription = () => {
  const dispatch = useDispatch();
  const {id} = useParams<string>();
 //const {id}  = useParams();
  
  console.log ("id ====== "+ id);
  const order = useTypeSelector(store => store.orderCard.order);

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
