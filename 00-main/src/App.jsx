import { useState, useEffect } from "react";

function Cell({ filled, onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        h-20 w-20
        border border-black
        transition-colors duration-300
        ${filled ? "bg-green-500" : "bg-white"}
        ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
      `}
    />
  );
}

function App() {
  const [order, setOrder] = useState([]);
  const [isDeactivating, setIsDeactivating] = useState(false);

  const config = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ];

  const totalCells = config.flat().filter(Boolean).length;

  const activateCells = (value) => {
    if (order.includes(value)) return;

    setOrder((prevOrder) => {
      const newOrder = [...prevOrder, value];

      if (newOrder.length === totalCells) {
        setIsDeactivating(true);
      }

      return newOrder;
    });
  };

  useEffect(() => {
    let timer;

    if (isDeactivating) {
      timer = setInterval(() => {
        setOrder((prevOrder) => {
          const newOrder = prevOrder.slice();
          newOrder.pop();

          if (newOrder.length === 0) {
            setIsDeactivating(false);
          }

          return newOrder;
        });
      }, 500);
    }

    return () => clearInterval(timer);
  }, [isDeactivating]);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div
        className="grid gap-1"
        style={{
          gridTemplateColumns: `repeat(${config[0].length}, 1fr)`,
        }}
      >
        {config.flat().map((item, index) =>
          item ? (
            <Cell
              key={index}
              filled={order.includes(index)}
              onClick={() => activateCells(index)}
              disabled={isDeactivating || order.includes(index)}
            />
          ) : (
            <div key={index} className="h-20 w-20" />
          )
        )}
      </div>
    </div>
  );
}

export default App;