import React from "react";

const Textarea = ({ title, type, onChange, name, value }) => {
  return (
    <div className="flex gap-2 flex-col mb-4 w-full lg:w-3/4 items-center">
      <label className="font-medium text-sm " htmlFor={title}>
        {title} :
      </label>
      <textarea
        className="text-black w-full text-center rounded-md p-1 outline-none max-w-lg text-sm focus:outline focus:outline-red-300"
        type={type}
        placeholder={`Ingrese ${title}`}
        onChange={onChange}
        name={name}
        rows="5"
      />
    </div>
  );
};

export default Textarea;
