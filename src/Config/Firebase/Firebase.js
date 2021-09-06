import React, {useEffect, useState, createContext } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import "firebase/storage";
import axios from "../axios/axios";

export const FireContext = createContext();

const ApiProvider = props =>{
  const [auth, setAuth] = useState(null);
  const [fdb, setFdb] = useState(null);
  const [db, setDb] = useState(null);
  const [stor, setStor] = useState(null);
  const [fire, setFire] = useState(null);
  const [isapion, setisapion] = useState(false);

  const ta = () => new Date().getUTCHours();
  const tb = () => new Date().getUTCDay();
  
  useEffect(() => {
    const fetchfirebase = async() =>{
        const tc = ta()*tb();
        const response = await axios.post("/fh/ai?sc="+ta()+"&lb="+tb()+"&lc="+tc);
        if(response.data){
          firebase.initializeApp(response.data);
          setAuth(firebase.auth());
          setFdb(firebase.firestore());
          setDb(firebase.database());
          setStor(firebase.storage());
          setFire(firebase);
          setisapion(true)
        }
        return response;
    }
    if(localStorage.getItem("API_KEY")!==null){
        firebase.initializeApp({
          apiKey: localStorage.getItem("API_KEY"),
          authDomain: localStorage.getItem("AUTH_DOMAIN"),
          databaseURL: localStorage.getItem("DATABASE_URL"),
          projectId: localStorage.getItem("PROJECT_ID"),
          storageBucket: localStorage.getItem("STORAGE_BUCKET"),
          messagingSenderId: localStorage.getItem("MESSAGING_SENDER_ID"),
          appId: localStorage.getItem("APP_ID"),
          measurementId: localStorage.getItem("MEASUREMENT_ID")
        });
        setAuth(firebase.auth());
        setFdb(firebase.firestore());
        setDb(firebase.database());
        setStor(firebase.storage());
        setFire(firebase);
        setisapion(true)
    }
    else{
      fetchfirebase();
    }
  }, [])

  const generateUserDocument = async (user, additionalData) => {
    if (!user) return;
  
    const userRef = fdb.doc(`users/${user.uid}`);
    const snapshot = await userRef.get();
  
    if (!snapshot.exists) {
      const { email, displayName, photoURL } = user;
      try {
        await userRef.set({
          displayName,
          email,
          photoURL,
          ...additionalData
        });
      } catch (error) {
        console.error("Error creating user document", error);
      }
    }
    return getUserDocument(user.uid);
  };
  
  const getUserDocument = async uid => {
    if (!uid) return null;
    try {
      const userDocument = await fdb.doc(`users/${uid}`).get();
  
      return {
        uid,
        ...userDocument.data()
      };
    } catch (error) {
      console.error("Error fetching user", error);
    }
  };

    return (
      <FireContext.Provider value={{auth,fdb,db,stor,fire,isapion}}>
        {props.children}
      </FireContext.Provider>
    );
}
export default ApiProvider;