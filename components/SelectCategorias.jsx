import React, { useEffect, useState } from "react";
import { fetchCategoria } from "../firebase/cliente";
import { model, categoria } from "../Data/model";

async function ObtenerCategoria() {
  const data = await fetchCategoria();
  return data;
}
export default function SelectCategorias({ onChange }) {
  const [list, setList] = useState([]);
  useEffect(() => {
    ObtenerCategoria().then((data) => {
      setList(data);
    });
  }, []);

  return (
    <div className="flex gap-2 flex-col mb-4 w-full items-center">
      <label className="font-medium text-sm ">Categoria :</label>
      <select
        name="categoria"
        onChange={onChange}
        className="text-black max-w-1/2 w-full text-center rounded-md p-1 outline-none text-sm focus:outline focus:outline-red-300 capitalize"
      >
        <option disabled selected>
          Seleccione
        </option>
        {list.map((item) => (
          <option key={item.id} value={`${item.nombre}`}>
            {item.nombre}
          </option>
        ))}
      </select>
    </div>
  );
}
