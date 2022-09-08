import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { addProduct } from "../../firebase/cliente";
import { useRouter } from "next/router";
import { model, categoria } from "../../Data/model";

export default function Categoria() {
  const router = useRouter();
  const [categ, seCateg] = useState(categoria);

  //Funcion para agregar producto al estado
  const handleChange = (e) => {
    const { name, value } = e.target;
    seCateg({ ...categ, [name]: value });
  };

  //Funcion para agregar producto a firebase
  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct(categ, `${model.Categoria}`)
      .then(() => {
        router.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Layout>
      <h1 className="text-center text-4xl text-red-300 font-bold mb-10">
        {" "}
        Agregar una Categoria{" "}
      </h1>
      <form onSubmit={handleSubmit}>
        <Input
          title={"Nombre de la categoria"}
          type={"text"}
          name={"nombre"}
          onChange={handleChange}
        />
        <Input
          title={"Descripción de la categoria"}
          type={"text"}
          name={"descripcion"}
          onChange={handleChange}
        />
        <Button disabled={categ.nombre.length === 0}>buscar</Button>
      </form>
    </Layout>
  );
}
