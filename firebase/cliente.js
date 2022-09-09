import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
export const addData = (data, tipo) => {
  const productsCollection = collection(db, tipo);
  return addDoc(productsCollection, data);
};

//Funciones para obtener datos de Firebase
export const fetchData = async (tipo) => {
  try {
    const ref = collection(db, `${tipo}`);
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

export const uploadImage = ({ file, id, type }) => {
  const storageRef = ref(storage, `${type}/${id}`);
  return uploadBytes(storageRef, file);
};

export const downloadImageURL = ({ id, type }) => {
  const storageRef = ref(storage, `${type}/${id}`);
  const url = getDownloadURL(storageRef);
  return url;
};
