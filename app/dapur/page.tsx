"use client";
import ListMeja from "@/components/dapur/ListMeja";
import { getListTable } from "@/utils/global";
import { useEffect, useState } from "react";

type Order = {
  id: string;
  tableId: number;
  menuId: string;
  qty: number;
};

type Menu = { id: string; name: string };

export default function Dapur() {
  const [order, setOrder] = useState<Order[]>([]);

  useEffect(() => {
    if (localStorage) {
      setOrder(JSON.parse(localStorage.getItem("order") || "[]"));
    }
  }, []);

  const list = getListTable(order);

  return (
    <div className="flex flex-row">
      {list.map((list, index: number) => {
        return <ListMeja key={index} tableId={list} order={order} />;
      })}
    </div>
  );
}
