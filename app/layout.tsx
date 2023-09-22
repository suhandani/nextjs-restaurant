"use client";

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import ButtonMenu from "@/components/ButtonMenu";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nextjs Restaurant",
  description: "Learn to build Nextjs applications",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = usePathname();

  useEffect(() => {
    localStorage.setItem(
      "menus",
      '[{"id":"996756","name":"Ayam Kecap Manis"},{"id":"362342","name":"Nasi Goreng Spesial"}]'
    );
  }, []);

  const reset = () => {
    localStorage.setItem(
      "menus",
      '[{"id":"996756","name":"Ayam Kecap Manis"},{"id":"362342","name":"Nasi Goreng Spesial"}]'
    );
    localStorage.removeItem("order");
    location.reload();
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col p-6 space-y-5 w-[650px]">
          <div className="flex flex-row">
            <div className="flex flex-col mr-12">
              <h1 className="text-3xl">[Contoh] Sistem Restaurant</h1>
              <h5 className="text-sm">Ambisius Coding Challenge #230916H</h5>
              <div className="flex flex-row bg-[#ccc] rounded">
                <ButtonMenu title="Menu" path={router} />
                <ButtonMenu title="Order" path={router} />
                <ButtonMenu title="Dapur" path={router} />
                <ButtonMenu title="Kasir" path={router} />
              </div>
            </div>
            <div className="flex flex-col">
              <div></div>
              <div>
                <button
                  className="border-[1px] border-solid p-2 m-2"
                  onClick={reset}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="flex flex-col bg-slate-300 w-[650px] rounded min-h-[300px]">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
