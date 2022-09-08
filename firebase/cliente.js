import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB88HAkBTSs7OIRsVrfS3Z_21mqOyZewas",
  authDomain: "manitas-bd.firebaseapp.com",
  databaseURL: "https://manitas-bd-default-rtdb.firebaseio.com",
  projectId: "manitas-bd",
  storageBucket: "manitas-bd.appspot.com",
  messagingSenderId: "690582338472",
  appId: "1:690582338472:web:084b81c543a35490223b9d",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
//Fucnion para agregar producto a Firebase
export const addProduct = (data, tipo) => {
  const productsCollection = collection(db, tipo);
  return addDoc(productsCollection, data);
};

//Funciones para obtener datos de Firebase
export const fetchProducts = async () => {
  try {
    const ref = collection(db, "producto");
    const snapshot = await getDocs(ref);
    const docs = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      const id = doc.id;
      docs.push({ id, ...data });
    });
    return docs;
  } catch (error) {
    console.log(error);
  }
};
export const fetchCategoria = async () => {
  try {
    const ref = collection(db, "categoria");
    const snapshot = await getDocs(ref);
    const docs = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      const id = doc.id;
      docs.push({ id, ...data });
    });
    return docs;
  } catch (error) {
    console.log(error);
  }
};
export const fetchMaterial = async () => {
  try {
    const ref = collection(db, "material");
    const snapshot = await getDocs(ref);
    const docs = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      const id = doc.id;
      docs.push({ id, ...data });
    });
    return docs;
  } catch (error) {
    console.log(error);
  }
};

export const uploadImage = ({ file, carp }) => {
  const storageRef = ref(storage, `/${carp}/${file.name}`);

  // 'file' comes from the Blob or File API
  uploadBytes(storageRef, file).then((snapshot) => {
    console.log("Uploaded a blob or file!", snapshot);
  });
};
