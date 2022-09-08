import React, { useEffect, useState } from "react";
import { fetchMaterial } from "../firebase/cliente";
import { model } from "../Data/model";

async function ObtenerMaterial() {
  const data = await fetchMaterial();
  return data;
}
export default function SelectMaterial({ onChange }) {
  const [list, setList] = useState([]);
  useEffect(() => {
    ObtenerMaterial().then((data) => {
      setList(data);
    });
  }, []);
  return (
    <div className="flex gap-2 flex-col mb-4 w-full items-center">
      <label className="font-medium text-sm ">Material :</label>
      <select
        name="material"
        onChange={onChange}
        className="text-black max-w-1/2 w-full text-center rounded-md p-1 outline-none text-sm focus:outline focus:outline-red-300 capitalize"
      >
        <option disabled selected value>
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
