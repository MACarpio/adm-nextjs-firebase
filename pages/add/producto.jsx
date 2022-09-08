import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { addProduct, uploadImage } from "../../firebase/cliente";
import { useRouter } from "next/router";
import { model, producto } from "../../Data/model";
import Textarea from "../../components/Textarea";
import SelectCategorias from "../../components/SelectCategorias";
import SelectMaterial from "../../components/SelectMaterial";
import SelectBolean from "../../components/SelectBolean";
import Card from "../../components/Card";
import defaulImage from "../../public/prod.jpg";

export default function Producto() {
  const router = useRouter();
  const [product, setProduct] = useState(producto);
  const [imagePrev, setImagePrev] = useState(defaulImage);
  const [image, setImage] = useState(null);

  //Funcion para agregar producto al estado
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  //Funcion para agregar producto a firebase
  const handleSubmit = (e) => {
    e.preventDefault();
    uploadImage({ file: image, carp: `${product.nombre}` });
    addProduct(product, `${model.Producto}`)
      .then(() => {
        router.reload();
      })
      .catch((err) => console.log(err));
  };
  const imagePreview = (e) => {
    console.log(e);
    const file = e.target.files[0];
    setImagePrev(URL.createObjectURL(file));
    setImage(file);
  };
  return (
    <Layout>
      <div className="flex contenedor-catalogo flex-col lg:flex-row gap-5 w-full justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="w-11/12 md:w-2/3 lg:w-1/2 flex flex-col items-center"
        >
          <h1 className="text-center text-2xl text-red-300 font-bold mb-5">
            {" "}
            Agregar un Producto{" "}
          </h1>
          <Input
            title={"Nombre "}
            type={"text"}
            name={"nombre"}
            onChange={handleChange}
          />
          <Input
            title={"Precio"}
            type={"Number"}
            name={"precio"}
            onChange={handleChange}
          />
          <div className="flex w-full max-w-lg gap-2 lg:w-3/4">
            <SelectMaterial onChange={handleChange} />
            <SelectCategorias onChange={handleChange} />
          </div>
          <div className="flex w-full max-w-lg gap-2 lg:w-3/4">
            <SelectBolean
              name={"estado"}
              v={"mostrar"}
              f={"ocultar"}
              onChange={handleChange}
              sel={true}
            />
            <SelectBolean
              name={"home"}
              v={"Si"}
              f={"No"}
              onChange={handleChange}
              sel={false}
            />
          </div>
          <Textarea
            title={"Descripción "}
            type={"text"}
            name={"descripcion"}
            onChange={handleChange}
          />
          <div className="flex w-full max-w-lg gap-2 lg:w-3/4">
            <input
              className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none  dark:placeholder-gray-400"
              aria-describedby="user_avatar_help"
              type="file"
              onChange={imagePreview}
              // multiple
            />
          </div>
          <Button
            disabled={
              product.nombre.length === 0 ||
              product.descripcion.length === 0 ||
              product.precio.length === 0 ||
              product.categoria.length === 0 ||
              product.material.length === 0 ||
              product.precio <= 0
            }
          >
            Registrar
          </Button>
        </form>
        <div className="md:w-1/2 w-full">
          <h1 className="text-center text-2xl text-red-300 font-bold mb-5 capitalize">
            vista previa
          </h1>
          <div className=" grid place-items-center">
            <Card
              nombre={product.nombre}
              precio={product.precio}
              src={imagePrev}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
