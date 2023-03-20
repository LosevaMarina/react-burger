import React, { useEffect  } from "react";
import { ConstructorElement, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import data from '../utils/data';
import styles from './burger-constructor.module.css';
import OrderDetails from "../order-details/order-details";
import PropTypes from "prop-types";
import Modal from '../modal/modal';

const BurgerConstructor = ({state}) => {
  
  const [modalActive, setModalActive] = React.useState (true);

  const openModal = () => {
    setModalActive(true);
  }

  const closeModal = () => {
    setModalActive(false);
  }

  const closeModalESC = (e) => {
    if (e.key === 'Escape') {
      setModalActive(false);
    }
  }

  useEffect(() => {
    document.body.addEventListener("keydown", closeModalESC);
    return () => {
      document.body.removeEventListener("keydown", closeModalESC);
    }
  }, [])

        return (
          <section className={styles.block}>
            <ul className = {styles.listElements}>
            <li className={styles.element}>
                <ConstructorElement
                  type="top"
                  isLocked={true}
                  text="Краторная булка N-200i (верх)"
                  price="12220"
                />            
            </li>
            <div className={styles.list}>
              {state.map((obj) => (                   
                <li key={obj._id} className={styles.listItem}>
                  <div className={styles.points}></div>
                  <ConstructorElement
                    text={obj.name}
                    price={obj.price}
                    thumbnail={obj.image}
                  />     
                </li>   
            ))}
            </div>       
            <li className={styles.element}>
            <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text="Краторная булка N-200i (низ)"
                  price="15421"
                /> 
            </li>
           </ul>

            <div className={styles.order}>
              <div className={styles.sum}>
                <p className="text text_type_digits-medium">610</p>
                <div className={styles.subtract}></div>
              </div>
              {/* <Button htmlType="button" type="primary" size="large" onClick={openModal}>*/}

              <Button htmlType="button" type="primary" size="large" onClick={() => setModalActive(true)}>
                Оформить заказ
              </Button>
            </div>
            <Modal openModal={modalActive} onClose={closeModal}>
              <OrderDetails />
            </Modal>


          </section>
        )
      }

      BurgerConstructor.propTypes = {
        state: PropTypes.array.isRequired,
      };

export default BurgerConstructor;


