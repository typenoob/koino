import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../constants";

export default function DragableItem({ isDragging, text }) {
  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      item: { text },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    }),
    []
  );
  return (
    <div ref={dragRef} style={{ opacity }}>
      {text}
    </div>
  );
}
