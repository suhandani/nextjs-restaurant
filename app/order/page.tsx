"use client";
import Table from "@/components/order/Table";
import { useEffect, useState } from "react";

type Order = {
  id: string | undefined;
  tableId: number | undefined;
  menuId: number | undefined;
  qty: number | undefined;
};

type Menu = { id: string; name: string };

export default function Order() {
  const [order, setOrder] = useState<Order>({
    id: Math.floor(1000000 + Math.random() * 9000000).toString(),
    tableId: 0,
    menuId: 0,
    qty: 0,
  });

  const changeTable = (e: number) => {
    setOrder((prev) => {
      return {
        ...prev,
        tableId: e == prev.tableId ? 0 : e,
      };
    });
  };

  const [menus, setMenus] = useState<Menu[]>([]);

  useEffect(() => {
    if (localStorage) {
      setMenus(JSON.parse(localStorage.getItem("menus") || "[]"));
    }
  }, []);

  const changeMenu = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrder((prev) => {
      return {
        ...prev,
        menuId: +e.target.value,
      };
    });
  };

  const changeQty = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrder((prev) => {
      return {
        ...prev,
        qty: +e.target.value,
      };
    });
  };

  const flag =
    order.menuId != 0 && order.qty != 0 && order.tableId != 0 ? false : true;

  const handleSubmit = () => {
    const sotrageOrderList = localStorage.getItem("order");
    if (sotrageOrderList) {
      const orderList: Order[] = JSON.parse(sotrageOrderList);
      orderList.push(order);
      localStorage.setItem("order", JSON.stringify(orderList));
    } else {
      localStorage.setItem("order", JSON.stringify([order]));
    }

    setOrder({
      id: (Math.floor(Math.random() * 100000) + 1).toString(),
      tableId: undefined,
      menuId: 0,
      qty: 0,
    });
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row">
          <Table index={1} tableId={order.tableId} changeTable={changeTable} />
          <Table index={2} tableId={order.tableId} changeTable={changeTable} />
          <Table index={3} tableId={order.tableId} changeTable={changeTable} />
        </div>
        <div className="flex flex-row">
          <div className="m-3 w-2/3">Menu</div>
          <div className="m-3 w-1/3">Jumlah</div>
        </div>
        <div className="flex flex-row">
          <select
            id="myMenu"
            className="m-3 w-2/3 text-left"
            value={order.menuId}
            onChange={changeMenu}
          >
            <option disabled value={0}>
              Pilih Menu
            </option>
            {menus.map((menu, index: number) => {
              return (
                <option key={index} value={menu.id}>
                  {menu.name}
                </option>
              );
            })}
          </select>
          <select
            id="myQty"
            className="m-3 w-1/3 text-left"
            value={order.qty}
            onChange={changeQty}
          >
            <option disabled value={0}>
              Kuantitas
            </option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>
        </div>
        <div className="flex flex-row">
          <div className="m-5 text-right w-full">
            <button
              className={`p-5 m-5 ${
                flag == false ? "bg-black text-white" : "bg-white text-black"
              }`}
              disabled={flag}
              onClick={handleSubmit}
            >
              Tambah
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
