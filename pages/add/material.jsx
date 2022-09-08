import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { addProduct } from "../../firebase/cliente";
import { useRouter } from "next/router";
import { model, material } from "../../Data/model";

export default function Material() {
  const router = useRouter();
  const [mater, setMater] = useState(material);

  //Funcion para agregar producto al estado
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMater({ ...mater, [name]: value });
  };

  //Funcion para agregar producto a firebase
  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct(mater, `${model.Material}`)
      .then(() => {
        router.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Layout>
      <h1 className="text-center text-4xl text-red-300 font-bold mb-10">
        {" "}
        Agregar una Material{" "}
      </h1>
      <form onSubmit={handleSubmit}>
        <Input
          title={"Nombre del Material"}
          type={"text"}
          name={"nombre"}
          onChange={handleChange}
        />
        <Input
          title={"Descripción del Material"}
          type={"text"}
          name={"descripcion"}
          onChange={handleChange}
        />
        <Button disabled={mater.nombre.length === 0}>buscar</Button>
      </form>
    </Layout>
  );
}
