import React from "react";

export default function Button({ children, onClick, disabled }) {
  return (
    <>
      <button
        className="bg-red-300 px-5 py-2 rounded-full font-bold capitalize cursor-pointer mt-2 disabled:bg-neutral-500 disabled:opacity-25 disabled:pointer-events-none transition-all"
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    </>
  );
}
