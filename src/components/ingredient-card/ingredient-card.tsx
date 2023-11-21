import { useRef } from "react";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import {
  CONSTRUCTOR_CARD,
  MOVE_INGREDIENT,
  removeIngredient,
} from "../../services/actions/burger-constructor";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient-card.module.css";
import {removeIngredientCounter} from "../../services/actions/burger-ingredients";
import {IIngredientType} from "../../utils/data";

interface IIngredientCard {
  item: IIngredientType;
  index: number;
}

type DragObject = {
  name: string;
  type: string;
  index: number
}

export const IngredientCard: FC<IIngredientCard> = ({ item, index }) => {
  const { name, price, image, _id } = item;

  const dispatch = useDispatch();
  //const ref = useRef(null);
  
  //const ref = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLLIElement>(null);

  const [{ isDragging }, dragRef] = useDrag({
    type: CONSTRUCTOR_CARD,
    item: () => {
      return { _id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: CONSTRUCTOR_CARD,
    hover: (item: DragObject, monitor: any) => {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
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

  const onClose = (item: IIngredientType, index: number, _id: any) => {
    dispatch(removeIngredient(item, index));
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
        text={name}
        price={price}
        thumbnail={image}
        handleClose={() => onClose(item, index, _id)}
      />
    </li>
  );
};
