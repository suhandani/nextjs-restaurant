import Link from "next/link";
import React from "react";

type Props = {
  title: string;
  path: string;
};

function ButtonMenu({ title, path }: Props) {
  return (
    <Link
      href={title.toLowerCase()}
      className={`p-2 pr-10 pl-10 rounded ${
        path.replace("/", "") == title.toLowerCase()
          ? "bg-slate-500"
          : "bg-[#ccc]"
      }`}
    >
      <p>{title}</p>
    </Link>
  );
}

export default ButtonMenu;
