import Layout from "../components/Layout";
import { downloadImageURL } from "../firebase/cliente";
import { useEffect, useState } from "react";
import Image from "next/image";
export default function Home() {
  const [resUrl, setResUrl] = useState("");

  downloadImageURL({ file: "Lana.jpg", carp: "lana", type: "material" }).then(
    (res) => setResUrl(res)
  );
  console.log(resUrl);

  return (
    <div className="">
      <Layout>
        <h1>hola</h1>
        <Image src={resUrl} width={500} height={500} />
      </Layout>
    </div>
  );
}
