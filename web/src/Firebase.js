import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCq99JM5eMNt2L70RjItnIrZD3qlV-UbXE",
  authDomain: "youniversityv8-ded7b.firebaseapp.com",
  projectId: "youniversityv8-ded7b",
  storageBucket: "youniversityv8-ded7b.firebasestorage.app",
  messagingSenderId: "838027721695",
  appId: "1:838027721695:web:1842092e6cb2028024226a",
  measurementId: "G-NKDL8ZG7N1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);


/*
사용 방법: 
import { db } from '../firebase'; // Firestore 연결
import { storage } from '../firebase'; // Storage 연결
*/

/*
firebase에 데이터 추가

import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

const addReport = async (data) => {
  try {
    const docRef = await addDoc(collection(db, "reports"), {
      title: data.title,
      description: data.description,
      createdAt: new Date()
    });
    console.log("Report added with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
*/

/*
파이어베이스 db 불러오기

import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const fetchReports = async () => {
  const querySnapshot = await getDocs(collection(db, "reports"));
  const reportList = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
  console.log(reportList);
  return reportList;
};
*/