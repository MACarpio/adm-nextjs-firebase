import React, { useEffect } from "react";
import { Add } from "../Data/data";
import Link from "next/link";

export default function Navbar() {
  useEffect(() => {
    const menu = document.querySelector("#menu");
  }, []);

  const handleMenu = () => {
    menu.classList.remove("left-0");
    menu.classList.add("-left-full");
  };
  return (
    <>
      <nav
        id="menu"
        className="bg-neutral-800 lg:w-1/4 w-[256px] p-10 flex flex-col text-center justify-center fixed h-screen border-r inset-0 -left-full sm:left-0 z-30"
      >
        <button
          className="absolute h-12 w-12 inset-0 text-3xl sm:hidden text-red-300  grid place-items-center z-50"
          onClick={handleMenu}
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-11.414L9.172 7.757 7.757 9.172 10.586 12l-2.829 2.828 1.415 1.415L12 13.414l2.828 2.829 1.415-1.415L13.414 12l2.829-2.828-1.415-1.415L12 10.586z"></path>
            </g>
          </svg>
        </button>
        <h1 className="text-center text-2xl text-red-300 font-bold mb-10">
          Manitas Creativas
        </h1>
        {Add.map((item) => (
          <div key={item.Title} className="mb-3">
            <Link href={`/${item.url}`}>
              <a className="text-base font-medium cursor-pointer mb-4 hover:text-red-300 transition-all">
                <i className="inline-block mr-4 text-red-300 text-xl align-text-bottom">
                  {item.Icon}
                </i>
                {item.Title}
              </a>
            </Link>
          </div>
        ))}
      </nav>
      <div className="max-h-screen bg-neutral-800 lg:w-1/4 w-[256px] h-screen hidden sm:block "></div>
    </>
  );
}
