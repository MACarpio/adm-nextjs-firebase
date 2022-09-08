import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { fetchCategoria } from "../../firebase/cliente";

export default function ListaCategoria({ lista }) {
  const [list, setList] = useState([]);
  useEffect(() => {
    setList(lista);
  }, [lista]);
  return (
    <Layout>
      <div className="uppercase mb-5 text-3xl font-bold text-red-300">hola</div>
      {list === undefined && <h1>no hay elementos</h1>}
      {list &&
        list.map((item) => (
          <div
            key={item.id}
            className="bg-white text-black p-5 rounded-lg shadow-lg shadow-red-300 "
          >
            <h1 className="text-lg font-bold">{item["nombre"]}</h1>
            <h2 className="text-base">{item.precio}</h2>
          </div>
        ))}
    </Layout>
  );
}
export async function getStaticProps() {
  return { props: { lista: await fetchCategoria() } };
}
