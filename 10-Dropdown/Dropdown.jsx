import { useState } from "react";
import "./App.css";

function Dropdown({ options }) {
  const [selected, setSelected] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e) => {
    setSelected(e.target.value);
  };

  return (
    <div className="dropdown-container">
      <h1>Dropdown</h1>

      <label>
        Fruits:

        <div className="select-wrapper">
          <select
            name="fruitname"
            value={selected}
            onChange={handleChange}
            onFocus={() => setIsOpen(true)}
            onBlur={() => setIsOpen(false)}
          >
            <option value="">Select Fruit</option>

            {options.map((fruit, index) => (
              <option key={index} value={fruit}>
                {fruit}
              </option>
            ))}
          </select>

          <span className="arrow">
            {isOpen ? "▲" : "▼"}
          </span>
        </div>
      </label>

      <p>Fruit Selected: {selected}</p>
    </div>
  );
}

export default Dropdown;