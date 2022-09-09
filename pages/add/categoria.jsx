import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { addData, uploadImage, downloadImageURL } from "../../firebase/cliente";
import { useRouter } from "next/router";
import { categoria, model } from "../../Data/model";
import Textarea from "../../components/Textarea";
import defaulImage from "../../public/prod.jpg";
import Card from "../../components/Card";
import { v4 } from "uuid";

export default function Categoria() {
  const router = useRouter();
  const [image, setImage] = useState(null);
  const [categ, setCateg] = useState(categoria);
  const [imagePrev, setImagePrev] = useState(defaulImage);
  const [url, setUrl] = useState(null);

  //Funcion para agregar producto al estado
  useEffect(() => {
    const ID = v4();
    setCateg({ ...categ, categoriaID: ID });
  }, []);

  useEffect(() => {
    if (image) {
      const es = downloadImageURL({
        id: categ.categoriaID,
        type: model.Categoria,
      }).then((url) => {
        setUrl(url);
      });
    }
  }, [image]);

  useEffect(() => {
    if (url) {
      setCateg({ ...categ, src: url });
    }
  }, [url]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCateg({ ...categ, [name]: value });
  };
  console.log(categ);
  //Funcion para agregar producto a firebase
  const handleSubmit = (e) => {
    e.preventDefault();
    categ.src === ""
      ? alert("No se ha agregado una imagen")
      : addData(categ, `${model.Categoria}`).then(() => {
          router.reload();
        });
  };

  const imagePreview = (e) => {
    const file = e.target.files[0];
    setImagePrev(URL.createObjectURL(file));
    const up = uploadImage({
      type: model.Categoria,
      id: `${categ.categoriaID}`,
      file: file,
    }).then(() => {
      setImage(file);
    });
  };
  return (
    <Layout>
      <h1 className="text-center text-4xl text-red-300 font-bold mb-10">
        {" "}
        Agregar una Categoria{" "}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="w-11/12 md:w-2/3 lg:w-1/2 flex flex-col items-center"
        encType="multipart/form-data"
      >
        <Input
          title={"Nombre de la Categoria"}
          type={"text"}
          name={"nombre"}
          onChange={handleChange}
        />
        <Textarea
          title={"Descripción de la Categoria"}
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

        <Card src={imagePrev} nombre={categ.nombre}></Card>
        {categ.src === "" ? (
          <h1>Archivo,No Subido</h1>
        ) : (
          <h1>Archivo,Subido</h1>
        )}
      </form>
    </Layout>
  );
}
