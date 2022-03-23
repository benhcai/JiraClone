import "./style.css";
import { useState, useRef } from "react";

const Board = (props) => {
  const [listData, setListData] = useState(props.listData);
  const [dragging, setDragging] = useState(false);
  const draggingItem = useRef({ group: null, item: null });
  const draggingNode = useRef(null);

  const handleDragStart = (e, listId, itemId) => {
    console.log("Starting drag...", { group: listId, item: itemId });
    console.log(listId, itemId);
    draggingItem.current = { group: listId, item: itemId };
    draggingNode.current = e.target;
    draggingNode.current.addEventListener("dragend", handleDragEnd); // Adding handleDragEnd directly to list-item causes problems
    setTimeout(() => setDragging(true), 0); // Styling (visibility) only occurs on the original element, not on the dragging element
  };

  const handleDragEnd = (e, listId, itemId) => {
    console.log("Ending drag...");
    setDragging(false);
    draggingItem.current = { group: null, item: null };
    draggingNode.current.removeEventListener("dragend", handleDragEnd);
    draggingNode.current = null;
  };

  const handleDragEnter = (e, listId, itemId) => {
    console.log("Enter drag...", listId, itemId);
    if (draggingItem.current.group !== listId || draggingItem.current.item !== itemId) {
      setListData((oldList) => {
        console.log("NOT THE SAME", oldList);
        let newList = [...oldList];
        // Remove draggingItem from the list,
        let removed = newList[draggingItem.current.group].items.splice(
          draggingItem.current.item,
          1
        );
        newList[listId].items.splice(itemId, 0, removed[0]);
        draggingItem.current = { group: listId, item: itemId };
        // console.log("removed", removed);
        return newList;
      });
    } else {
      console.log("same same...");
    }
  };

  const setDraggingStyle = (listId, itemId) => {
    console.log("Check dragging element...");
    if (listId === draggingItem.current.group && itemId === draggingItem.current.item) {
      return "dragging"; // setDragging causes a re-render, if this condition is true, that item become styled
    }
    return "";
  };

  const createItems = (listId, items) => {
    return items.map((item, itemId) => {
      return (
        <div
          className={`DND-list-item ${dragging ? setDraggingStyle(listId, itemId) : ""}`}
          draggable
          onDragStart={(e) => handleDragStart(e, listId, itemId)}
          onDragEnter={dragging ? (e) => handleDragEnter(e, listId, itemId) : null}
          onDragOver={(e) => {
            console.log("over", e);
            e.preventDefault();
          }}
          key={itemId}
        >
          {item}
        </div>
      );
    });
  };

  const createLists = (lists) => {
    return lists.map((list, listId) => {
      return (
        <div className="DND-list" key={listId}>
          <div className="DND-list-heading">
            <h2 className="">{list.group}</h2>
          </div>
          <div className={`DND-list-items`}>{createItems(listId, list.items)}</div>
        </div>
      );
    });
  };

  return (
    <div>
      <div className="DND-board">{createLists(listData)}</div>
    </div>
  );
};

export default Board;
