import "./style.css";
import { useState } from "react";

const ClickAndDrag = () => {
  const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(0);
  const [style, setStyle] = useState({});

  const handleDrag = (e) => {
    console.log(e.clientX, e.clientY);
    setCursorX(e.clientX);
    setCursorY(e.clientY);
    setStyle({ left: e.clientX - 77 - 86 });
  };

  return (
    <div className="ClickAndDrag">
      <h1>Click And Drag</h1>
      <div>
        {`X: ${cursorX}`}
        <br />
        {`Y: ${cursorY}`}
      </div>
      <div className="board">
        <div className="board_tables">
          <div className="board_task" style={style} draggable onDragEnd={handleDrag}>
            Here is a task.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClickAndDrag;
