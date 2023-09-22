import React from "react";

type Props = {
  index: number;
  tableId: number | undefined;
  changeTable: (e: number) => void;
};

function Table({ index, tableId, changeTable }: Props) {
  return (
    <button
      className={`p-2 m-2 rounded w-1/3 text-center ${
        tableId == index ? "bg-black text-white" : "bg-white"
      }`}
      onClick={() => changeTable(index)}
    >
      Meja {index}
    </button>
  );
}

export default Table;
