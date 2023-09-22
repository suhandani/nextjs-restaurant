"use client";

import MenuMakanan from "@/components/menu/MenuMakanan";
import { useEffect, useState } from "react";

type Menu = { id: string; name: string };

export default function Menu() {
  const [menus, setMenus] = useState<Menu[]>([
    { id: "996756", name: "Ayam Kecap Manis" },
    { id: "362342", name: "Nasi Goreng Spesial" },
  ]);
  const [nama, setNama] = useState("");

  useEffect(() => {
    if (localStorage) {
      localStorage.setItem("menus", JSON.stringify(menus));
      setMenus(JSON.parse(localStorage.getItem("menus") || "[]"));
    }
  }, []);

  const hapusMenu = (index: number) => {
    setMenus((prev) => {
      const newMenus = [...prev];
      newMenus.splice(index, 1);
      localStorage.setItem("menus", JSON.stringify(newMenus));
      return newMenus;
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNama(e.target.value);
  };

  const handleSubmit = () => {
    setMenus((prev) => {
      const newMenus = [
        {
          id: Math.floor(100000 + Math.random() * 900000).toString(),
          name: nama,
        },
        ...prev,
      ];
      localStorage.setItem("menus", JSON.stringify(newMenus));
      return newMenus;
    });
  };

  return (
    <>
      <h2 className="p-2 m-2">Menu Makanan</h2>
      <div className="flex flex-row">
        <div className="flex flex-col w-2/3">
          <input
            onChange={handleChange}
            className="rounded p-2 m-2"
            placeholder="Tambahkan disini"
          ></input>
        </div>
        <div className="flex flex-col w-1/3">
          <button
            className="bg-black text-white rounded p-2 m-2"
            onClick={handleSubmit}
          >
            Tambah
          </button>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="p-2 m-2 w-1/4">ID</div>
        <div className="p-2 m-2 w-2/4">Menu</div>
        <div className="p-2 m-2 w-1/4 text-right">Hapus?</div>
      </div>
      {menus.map((menu, index: number) => {
        return (
          <MenuMakanan
            key={index}
            index={index}
            id={menu.id}
            menu={menu.name}
            hapusMenu={hapusMenu}
          />
        );
      })}
    </>
  );
}
