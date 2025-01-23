import {
  collection,
  getDocs,
  doc,
  getDoc,
  getFirestore,
  query,
  where,
  setDoc,
} from "firebase/firestore";
import app from "./init";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const firestore = getFirestore(app);
const auth = getAuth(app);
interface BooleanCallback {
  (status: boolean): void;
}

// get all data
export async function retrieveData(collactionName: string) {
  const snapshot = await getDocs(collection(firestore, collactionName));
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
}

// get data by ID
export async function retrieveDataById(collactionName: string, id: string) {
  const snapshot = await getDoc(doc(firestore, collactionName, id));
  const data = snapshot.data();
  return data;
}

export async function register(
  userData: {
    email: string;
    password: string;
    fullName: string;
    phone: number;
    role?: string;
  },
  callback: BooleanCallback
): Promise<void> {
  //Perintah untuk mengecek akun sudah terdaftar atau belum;
  const q = query(
    collection(firestore, "users"),
    where("email", "==", userData.email)
  );

  //mengeksekusi variable diatas;
  const snapshot = await getDocs(q);

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (data.length > 0) {
    callback(false);
  } else {
    // register akun (auth)
    const userCredectial = await createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.password
    );

    const user = userCredectial.user;

    if (!userData.role) {
      userData.role = "member";
    }
    // register firebase firestore;
    await setDoc(doc(firestore, "users", user.uid), userData)
      .then(() => {
        callback(true);
      })
      .catch((error) => {
        callback(false);
      });
  }
}
