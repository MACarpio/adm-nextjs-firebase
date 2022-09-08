import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { fetchData } from "../../firebase/cliente";
import { model } from "../../Data/model";
import Card from "../../components/Card";

export default function ListaCategoria({ lista }) {
  const [list, setList] = useState([]);
  useEffect(() => {
    setList(lista);
  }, [lista]);
  return (
    <Layout>
      <div className="capitalize mb-5 text-2xl font-bold text-red-300">
        Categorias
      </div>
      {list.length == 0 && <h1>No existen Categorias</h1>}
      {list &&
        list.map((item) => (
          <div key={item.id} className="mb-3">
            <Card nombre={item.nombre}></Card>
          </div>
        ))}
    </Layout>
  );
}
export async function getStaticProps() {
  return { props: { lista: await fetchData(model.Categoria) } };
}
