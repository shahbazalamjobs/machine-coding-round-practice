// App.jsx

import "./App.css";
import DragAndDrop from "./DragAndDrop";

const initialData = {
  todo: [
    { id: 1, text: "Learn React" },
    { id: 2, text: "Build Drag and Drop" },
    { id: 3, text: "Study useState Hook" },
    { id: 4, text: "Practice CSS Flexbox" },
    { id: 5, text: "Create Todo UI" },
  ],

  inProgress: [
    { id: 6, text: "Practice JavaScript" },
    { id: 7, text: "Understand useEffect" },
    { id: 8, text: "Build Kanban Board" },
    { id: 9, text: "Debug React App" },
  ],

  completed: [
    { id: 10, text: "Setup Project" },
    { id: 11, text: "Install React" },
    { id: 12, text: "Learn JSX Basics" },
    { id: 13, text: "Create Components" },
  ],
};

export default function App() {
  return (
    <div>
      <DragAndDrop initialData={initialData} />
    </div>
  );
}
