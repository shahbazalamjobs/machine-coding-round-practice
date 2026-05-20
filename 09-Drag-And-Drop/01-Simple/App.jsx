// App.jsx

import { useRef, useState } from "react";
import "./App.css";

const initialItems = [
  { id: 1, text: "Learn React" },
  { id: 2, text: "Practice JavaScript" },
  { id: 3, text: "Build Todo App" },
  { id: 4, text: "Study useEffect" },
  { id: 5, text: "Prepare for Interview" },
];

export default function App() {
  const [items, setItems] = useState(initialItems);

  const dragItem = useRef();
  const dragOverItem = useRef();

  // Drag Start
  const handleDragStart = (index) => {
    dragItem.current = index;
  };

  // Drag Enter
  const handleDragEnter = (index) => {
    dragOverItem.current = index;
  };

  // Drop
  const handleDrop = () => {
    const copiedItems = [...items];

    // Get dragged item
    const draggedItem = copiedItems[dragItem.current];

    // Remove dragged item
    copiedItems.splice(dragItem.current, 1);

    // Insert at new position
    copiedItems.splice(dragOverItem.current, 0, draggedItem);

    setItems(copiedItems);

    // Reset refs
    dragItem.current = null;
    dragOverItem.current = null;
  };

  return (
    <div className="container">
      <h1>Single Column Drag & Drop</h1>

      <div className="column">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="card"
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragEnter={() => handleDragEnter(index)}
            onDragEnd={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            {item.text}
          </div>
        ))}
      </div>
    </div>
  );
}