  import { useRef, useState } from "react";
  import "./App.css";

  export default function DragAndDrop({ initialState }) {
    const [data, setData] = useState(initialState);

    const dragItem = useRef();
    const dragContainer = useRef();

    const handleDragStart = (e, item, container) => {
      dragItem.current = item;
      dragContainer.current = container;

      e.target.classList.add("dragging");
    };

    const handleDragEnd = (e) => {
      e.target.classList.remove("dragging");
    };

    const handleDragOver = (e) => {
      e.preventDefault();
    };

    const handleDrop = (e, targetContainer) => {
      const item = dragItem.current;
      const sourceContainer = dragContainer.current;

      setData((prev) => {
        const newData = { ...prev };

        newData[sourceContainer] = newData[sourceContainer].filter(
          (i) => i !== item
        );

        newData[targetContainer] = [
          ...newData[targetContainer],
          item,
        ];

        return newData;
      });
    };

    return (
      <div className="drag-drop-wrapper">
        {Object.keys(data).map((container, index) => {
          return (
            <div
              key={index}
              className="container"
              onDrop={(e) => handleDrop(e, container)}
              onDragOver={handleDragOver}
            >
              <h2>{container}</h2>

              {data[container].map((item, idx) => {
                return (
                  <div
                    key={idx}
                    className="drag-item"
                    draggable
                    onDragStart={(e) =>
                      handleDragStart(e, item, container)
                    }
                    onDragEnd={handleDragEnd}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }