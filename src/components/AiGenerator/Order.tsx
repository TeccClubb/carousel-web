import React, { FC } from "react";
import { DragHandleIcon } from "@/icons";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useSlides } from "@/hooks";
import { useDispatch } from "react-redux";
import { reorderSlides } from "@/store";

const Order: FC = () => {
  const dispatch = useDispatch();

  const slides = useSlides();

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

    // <div className="p-4 pb-12 flex flex-col w-full">
    //   <div className="space-y-6">
    //     <div
    //       className="slide_sort_order_item border px-4 py-2 mb-2 rounded-md text-xs hover:bg-gray-100"
    //       data-rbd-draggable-context-id="4"
    //       data-rbd-draggable-id="item-a946813d-4759-4b60-95fa-17f1981c0eb9"
    //       tabIndex={0}
    //       role="button"
    //       aria-describedby="rbd-hidden-text-4-hidden-text-32"
    //       data-rbd-drag-handle-draggable-id="item-a946813d-4759-4b60-95fa-17f1981c0eb9"
    //       data-rbd-drag-handle-context-id="4"
    //       draggable="false"
    //       style={{userSelect: "none"}}
    //     >
    //       <div className="flex gap-2 items-center">
    //       <DragHandleIcon />
    //         <div>Mental Health and &lt;c&gt;Self-Care&lt;/c&gt;</div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Order;
