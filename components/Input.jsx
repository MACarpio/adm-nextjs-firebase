import React from "react";

const Input = ({ title, type, onChange, name, value }) => {
  return (
    <div className="flex gap-2 flex-col mb-4 w-full lg:w-3/4 items-center">
      <label className="font-medium text-sm " htmlFor={title}>
        {title} :
      </label>
      <input
        className="text-black max-w-lg w-full border-none text-center rounded-md p-1 outline-none text-sm focus:outline focus:outline-red-300 "
        type={type}
        placeholder={`Ingrese ${title}`}
        name={name}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
