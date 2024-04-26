import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

export const getUserProfile = (auth,dispatch) => {   
    if (auth) {
      let id = JSON.parse(JSON.stringify(auth))?.uid;
      const userDocRef = doc(db, "users", id);
      getDoc(userDocRef)
      .then((docSnapshot) => {
        if (docSnapshot.exists()) {
            dispatch({
              type: "SET_USERPROFILE",
              userProfile: docSnapshot.data(),
            });
          }
        })
        .catch((error) => {
          console.error("Error getting user document:", error);
        });
    }
  };