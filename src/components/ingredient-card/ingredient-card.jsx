import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { REMOVE_INGREDIENT_COUNTER } from "../../services/actions/burger-ingredients";
import {
  REMOVE_INGREDIENT,
  CONSTRUCTOR_CARD,
  INGREDIENT_MOVE,
} from "../../services/actions/burger-constructor";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient-card.module.css";

export const IngredientCard = ({ ingredient, index }) => {
  const { name, price, image, uuid, _id } = ingredient;
  const dispatch = useDispatch();
  const ref = useRef(null);

  const [{ isDragging }, dragRef] = useDrag({
    type: CONSTRUCTOR_CARD,
    item: () => {
      return { uuid, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

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
        type: INGREDIENT_MOVE,
        dragIndex: dragIndex,
        hoverIndex: hoverIndex,
      });

      item.index = hoverIndex;
    },
  });
  dragRef(dropRef(ref));

  function onClose(uuid, _id) {
    dispatch({
      type: REMOVE_INGREDIENT,
      uuid: uuid,
    });
    dispatch({
      type: REMOVE_INGREDIENT_COUNTER,
      _id: _id,
    });
  }

  return (
    <li
      className={`${styles.listItem} ${isDragging && styles.item_drag}`}
      ref={ref}
    >
      <div className={styles.points}>
        <DragIcon type={"primary"} />
      </div>
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image}
        handleClose={() => onClose(uuid, _id)}
      />
    </li>
  );
};
