import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import {
  removeIngredient,
  MOVE_INGREDIENT,
  CONSTRUCTOR_CARD,
} from "../../services/actions/burger-constructor";
import { removeIngredientCounter } from "../../services/actions/burger-ingredients";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient-card.module.css";
import { v4 as uuid } from "uuid";

export const IngredientCard = (props) => {
  const ingredient = props.item;
  const cartId = props.id;
  const index= props.index;
  const dispatch = useDispatch();

  const [{ isDragging }, dragRef] = useDrag({
    type: "cartItem",
    item: { cartId: cartId, ingredient: ingredient },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const ref = useRef(null);
  const [, dropRef] = useDrop({
    accept: CONSTRUCTOR_CARD,
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const clientOffset = monitor.getClientOffset();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      dispatch({
        type: MOVE_INGREDIENT,
        dragIndex: dragIndex,
        hoverIndex: hoverIndex,
      });

      item.index = hoverIndex;
    },
  });
  dragRef(dropRef(ref));

  const removeCartItem = (cartId, _id) => {
    dispatch(removeIngredient(cartId));
    dispatch(removeIngredientCounter(_id));
  };

  return (
    <li
      className={`${styles.listItem} ${isDragging && styles.item_drag}`}
      ref={ref}
    >
      <div className={styles.points}>
        <DragIcon type={"primary"} />
      </div>
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        type={props.type}
        isLocked={props.isLocked}
        handleClose={() => {
          removeCartItem(cartId, ingredient._id);
        }}
      />
    </li>
  );
};