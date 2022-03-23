import Board from "./Board";

const DragAndDrop = () => {
  const listData = [
    { group: 1, items: [1, 2, 3, 4] },
    { group: 2, items: [5, 6, 7] },
  ];

  return <Board listData={listData} />;
};

export default DragAndDrop;
