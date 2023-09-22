import { Order } from "@/types/global";
import React, { useEffect, useState } from "react";

type Props = {
  tableId: number;
  order: Order[];
};

type Menu = { id: string; name: string };

function ListMeja({ tableId, order }: Props) {
  const [menus, setMenus] = useState<Menu[]>([]);
  useEffect(() => {
    if (localStorage) {
      setMenus(JSON.parse(localStorage.getItem("menus") || "[]"));
    }
  }, []);
  return (
    <div className="m-3 w-1/3">
      <h1 className="text-xl">Meja {tableId}</h1>
      {order != undefined &&
        order.map((order: Order) => {
          if (order.tableId == tableId) {
            return (
              <div key={order.id} className="flex flex-row text-sm">
                <div className="mr-5">{order.qty}x</div>
                <div>
                  {menus.map((menu: Menu, index: number) => {
                    if (order.menuId == menu.id) {
                      return <div key={index}>{menu.name}</div>;
                    }
                  })}
                </div>
              </div>
            );
          }
        })}
    </div>
  );
}

export default ListMeja;
