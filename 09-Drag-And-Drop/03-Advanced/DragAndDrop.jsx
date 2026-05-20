// DragAndDrop.jsx

import { useState, useRef } from "react";

export default function DragAndDrop({ initialData }) {
  const [data, setData] = useState(initialData);

  const dragItem = useRef();
  const dragColumn = useRef();

  const dragOverItem = useRef();
  const dragOverColumn = useRef();

  // Start Drag
  const handleDragStart = (itemIndex, columnName) => {
    dragItem.current = itemIndex;
    dragColumn.current = columnName;
  };

  // Enter Item
  const handleDragEnter = (itemIndex, columnName) => {
    dragOverItem.current = itemIndex;
    dragOverColumn.current = columnName;
  };

  // Drop Item
  const handleDrop = () => {
    const sourceColumn = dragColumn.current;
    const sourceIndex = dragItem.current;

    const targetColumn = dragOverColumn.current;
    const targetIndex = dragOverItem.current;

    if (
      sourceColumn === undefined ||
      sourceIndex === undefined ||
      targetColumn === undefined ||
      targetIndex === undefined
    ) {
      return;
    }

    const updatedData = { ...data };

    // Get dragged item
    const draggedItem = updatedData[sourceColumn][sourceIndex];

    // Remove from source
    updatedData[sourceColumn].splice(sourceIndex, 1);

    // Add into target position
    updatedData[targetColumn].splice(targetIndex, 0, draggedItem);

    setData({ ...updatedData });

    // Reset refs
    dragItem.current = null;
    dragColumn.current = null;
    dragOverItem.current = null;
    dragOverColumn.current = null;
  };

  return (
    <div className="board">
      {Object.keys(data).map((column) => (
        <div
          key={column}
          className="column"
          onDragOver={(e) => e.preventDefault()}
        >
          <h2 className="column-title">
            {column === "todo"
              ? "Todo"
              : column === "inProgress"
              ? "In Progress"
              : "Completed"}
          </h2>

          <div className="items-container">
            {data[column].map((item, index) => (
              <div
                key={item.id}
                className="card"
                draggable
                onDragStart={() => handleDragStart(index, column)}
                onDragEnter={() => handleDragEnter(index, column)}
                onDragEnd={handleDrop}
              >
                {item.text}
              </div>
            ))}

            {/* Empty Drop Area */}
            <div
              className="empty-drop"
              onDragEnter={() => handleDragEnter(data[column].length, column)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
