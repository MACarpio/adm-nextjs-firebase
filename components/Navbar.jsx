import React from "react";
import { Add } from "../Data/data";
import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <nav className="bg-neutral-800 lg:w-1/4 w-[256px] p-10 flex flex-col text-center justify-center fixed  h-screen border-r inset-0">
        <h1 className="text-center text-2xl text-red-300 font-bold mb-10">
          Manitas Creativas
        </h1>
        {Add.map((item) => (
          <>
            <Link href={`/${item.url}`}>
              <a className="text-base font-medium cursor-pointer mb-4 hover:text-red-300 transition-all">
                <i className="inline-block mr-4 text-red-300 text-xl align-text-bottom">
                  {item.Icon}
                </i>
                {item.Title}
              </a>
            </Link>
          </>
        ))}
      </nav>
      <div className="max-h-screen bg-neutral-800 lg:w-1/4 w-[256px] h-screen "></div>
    </>
  );
}
