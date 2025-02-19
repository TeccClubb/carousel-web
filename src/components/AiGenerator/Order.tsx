import React, { FC, memo } from "react";
import { DragHandleIcon } from "@/icons";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useDispatch } from "react-redux";
import { reorderSlides } from "@/store/carousels.slice";
import { useCarouselsState } from "@/hooks/use-carousels-state";

const Order: FC = () => {
  const dispatch = useDispatch();

  const {
    carousel: {
      data: { slides },
    },
  } = useCarouselsState();

  return (
    <div className="p-4 pb-12 flex flex-col w-full">
      <div className="space-y-6">
        <DragDropContext
          onDragEnd={({ source, destination }) =>
            dispatch(
              reorderSlides({
                sourceIndex: source.index,
                destinationIndex: destination?.index,
              })
            )
          }
        >
          <Droppable droppableId="droppable">
            {(provided) => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{ listStyleType: "none", padding: 0 }}
              >
                {slides.map((slide, index) => (
                  <Draggable
                    key={slide.title.text}
                    draggableId={slide.title.text}
                    index={index}
                  >
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...provided.draggableProps.style,
                        }}
                        className="border px-4 py-2 mb-2 rounded-md text-xs hover:bg-gray-100"
                      >
                        <div className="flex gap-2 items-center">
                          <DragHandleIcon />
                          <span>{slide.title.text}</span>
                        </div>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default memo(Order);
