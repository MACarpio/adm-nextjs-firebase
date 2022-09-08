import React from "react";

export default function SelectBolean({ name, v = "Si", f = "No", onChange }) {
  return (
    <div className="flex gap-2 flex-col mb-4 w-full items-center">
      <label className="font-medium text-sm capitalize">{name} :</label>
      <select
        name={name}
        onChange={onChange}
        className="text-black max-w-1/2 w-full text-center rounded-md p-1 outline-none text-sm focus:outline focus:outline-red-300 capitalize"
      >
        <option value={true} selected>
          {v}
        </option>
        <option value={false}>{f}</option>
      </select>
    </div>
  );
}
