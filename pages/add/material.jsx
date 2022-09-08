import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { addData, uploadImage } from "../../firebase/cliente";
import { useRouter } from "next/router";
import { model, material } from "../../Data/model";
import defaulImage from "../../public/prod.jpg";
import Textarea from "../../components/Textarea";

export default function Material() {
  const router = useRouter();
  const [mater, setMater] = useState(material);
  const [imagePrev, setImagePrev] = useState(defaulImage);
  const [image, setImage] = useState(null);

  //Funcion para agregar producto al estado
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMater({ ...mater, [name]: value });
  };

  //Funcion para agregar producto a firebase
  const handleSubmit = (e) => {
    e.preventDefault();
    uploadImage({
      type: model.Material,
      carp: `${mater.nombre}`,
      file: image,
    });

    addData(mater, `${model.Material}`)
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
    setMater({ ...mater, image: `${file.name}` });
  };
  return (
    <Layout>
      <h1 className="text-center text-4xl text-red-300 font-bold mb-10">
        {" "}
        Agregar una Material{" "}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="w-11/12 md:w-2/3 lg:w-1/2 flex flex-col items-center"
      >
        <Input
          title={"Nombre del Material"}
          type={"text"}
          name={"nombre"}
          onChange={handleChange}
        />
        <Textarea
          title={"Descripción del Material"}
          type={"text"}
          name={"descripcion"}
          onChange={handleChange}
        />
        <div className="flex w-full max-w-lg gap-2 lg:w-3/4 flex-col">
          <label className="font-medium text-sm ">Imagen :</label>
          <input
            className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none  dark:placeholder-gray-400"
            aria-describedby="user_avatar_help"
            type="file"
            onChange={imagePreview}
            // multiple
          />
        </div>
        <Button disabled={mater.nombre.length === 0}>buscar</Button>
      </form>
    </Layout>
  );
}
