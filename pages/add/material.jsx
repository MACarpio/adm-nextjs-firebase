import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { addData, uploadImage, downloadImageURL } from "../../firebase/cliente";
import { useRouter } from "next/router";
import { material, model } from "../../Data/model";
import Textarea from "../../components/Textarea";
import defaulImage from "../../public/prod.jpg";
import Card from "../../components/Card";
import { v4 } from "uuid";

export default function Material() {
  const router = useRouter();
  const [image, setImage] = useState(null);
  const [mater, setMater] = useState(material);
  const [imagePrev, setImagePrev] = useState(defaulImage);
  const [url, setUrl] = useState(null);

  //Funcion para agregar producto al estado
  useEffect(() => {
    const ID = v4();
    setMater({ ...mater, materialID: ID });
  }, []);

  useEffect(() => {
    if (image) {
      const es = downloadImageURL({
        id: mater.materialID,
        type: model.Material,
      }).then((url) => {
        setUrl(url);
      });
    }
  }, [image]);

  useEffect(() => {
    if (url) {
      setMater({ ...mater, src: url });
    }
  }, [url]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMater({ ...mater, [name]: value });
  };
  console.log(mater);
  //Funcion para agregar producto a firebase
  const handleSubmit = (e) => {
    e.preventDefault();
    addData(mater, `${model.Material}`).then(() => {
      mater.src === ""
        ? alert("No se ha agregado una imagen")
        : router.reload();
    });
  };

  const imagePreview = (e) => {
    const file = e.target.files[0];
    setImagePrev(URL.createObjectURL(file));
    const up = uploadImage({
      type: model.Material,
      id: `${mater.materialID}`,
      file: file,
    }).then(() => {
      setImage(file);
    });
  };
  return (
    <Layout>
      <h1 className="text-center text-4xl text-red-300 font-bold mb-10">
        {" "}
        Agregar un Material{" "}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="w-11/12 md:w-2/3 lg:w-1/2 flex flex-col items-center"
        encType="multipart/form-data"
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
        <Button>buscar</Button>

        <Card src={imagePrev} nombre={mater.nombre}></Card>
        {mater.src === "" ? (
          <h1>Archivo,No Subido</h1>
        ) : (
          <h1>Archivo,Subido</h1>
        )}
      </form>
    </Layout>
  );
}
