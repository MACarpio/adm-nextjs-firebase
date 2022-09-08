import React from "react";
import Image from "next/image";

export default function Card({ nombre, precio, src }) {
  return (
    <div className="text-black w-64 flex flex-col items-center bg-white rounded-lg h-full gap-1">
      {src && (
        <div className="w-full h-52 bg-gray-300 rounded-b-lg overflow-hidden mb-3 shadow-md">
          <Image
            src={src}
            width={500}
            height={450}
            layout="responsive"
            objectFit="cover"
            alt="producto"
          />
          )
        </div>
      )}
      <h3 className="font-bold text-lg">{nombre}</h3>
      {precio && <p className="text-sm">S/ {precio}</p>}
      <div className="flex w-full justify-center mb-3">
        <a className="bg-red-300 py-1 px-5 rounded-xl font-medium text-sm shadow-md border cursor-pointer">
          Detalles
        </a>
      </div>
    </div>
  );
}
