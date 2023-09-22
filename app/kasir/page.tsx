"use client";

import { getListTable } from "@/utils/global";
import { SetStateAction, useEffect, useState } from "react";

type Order = {
  id: string;
  tableId: number;
  menuId: string;
  qty: number;
};

type Menu = { id: string; name: string };

type PrintMenu = { qty: number; name: string };

export default function Kasir() {
  const [order, setOrder] = useState<Order[]>([]);

  const [menus, setMenus] = useState<Menu[]>([]);

  const [table, setTable] = useState<Number>(0);

  const [printMenu, setPrintMenu] = useState<PrintMenu[]>([]);

  useEffect(() => {
    if (localStorage) {
      setOrder(JSON.parse(localStorage.getItem("order") || "[]"));
    }
    if (localStorage) {
      setMenus(JSON.parse(localStorage.getItem("menus") || "[]"));
    }
  }, []);

  const list = getListTable(order);

  const changeTable = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTable(+e.target.value);
    if (+e.target.value == 0) {
      setPrintMenu([]);
    }
  };

  const printStruk = () => {
    const listOrder: PrintMenu[] = [];
    order.map((order) => {
      if (order.tableId == table) {
        menus.map((menu) => {
          if (menu.id == order.menuId) {
            listOrder.push({
              name: menu.name,
              qty: order.qty,
            });
          }
        });
      }
    });
    setPrintMenu(listOrder);
  };

  const deleteMeja = (e: number) => {
    setOrder((prev) => {
      const newOrder = prev.filter((order) => order.tableId != e);
      localStorage.setItem("order", JSON.stringify(newOrder));
      return newOrder;
    });
    setTable(0);
    setPrintMenu([]);
  };

  return (
    <div className="flex flex-col">
      <div className="m-2">Meja</div>
      <div className="flex flex-row">
        <div className="m-4 w-2/4">
          <select id="pilihMeja" className="m-4 w-full" onChange={changeTable}>
            <option value={0}>Pilih Meja</option>
            {list.map((list, index: number) => {
              return (
                <option key={index} value={+list}>
                  {list}
                </option>
              );
            })}
          </select>
        </div>
        <div className="m-4 w-1/4">
          <button
            id="btnPrint"
            className={`p-2 m-2 rounded ${
              table != 0 ? "bg-black text-white" : "bg-white text-black"
            }`}
            disabled={table == 0 ? true : false}
            onClick={printStruk}
          >
            Print Struk
          </button>
        </div>
        <div className="m-4 w-1/4">
          <button
            className={`p-2 m-2 bg-red-500 rounded ${
              table == 0 ? "hidden" : ""
            }`}
            onClick={() => deleteMeja(+table)}
          >
            Kosongkan Meja
          </button>
        </div>
      </div>
      {printMenu.length != 0 && (
        <div id="print" className="flex flex-col">
          <table>
            <tbody>
              <tr>
                <th className="m-4 text-center">Jumlah</th>
                <th className="m-4 text-left">Menu</th>
                <th className="m-2 text-center">Harga</th>
              </tr>
              {printMenu.map((printMenu, index: number) => {
                return (
                  <tr key={index}>
                    <td className="m-4 text-center">{printMenu.qty}</td>
                    <td className="m-4 text-left">{printMenu.name}</td>
                    <td className="m-2 text-center">Gratis</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="text-center mt-10">
            Terima kasih sudah makan di RESTORAN
          </div>
        </div>
      )}
    </div>
  );
}
