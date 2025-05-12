import { getDoc, setDoc, doc } from "firebase/firestore";
import { db } from "./../config/FirebaseConfig";
import { useEffect } from "react";
import React from "react";

const GetSavedList = async (user) => {
    const userEmail = user?.primaryEmailAddress?.emailAddress;
    const docSnaps = await getDoc(doc(db, 'userSaved', userEmail));

    if (docSnaps.exists()) {
        return docSnaps.data();
    } else {
        await setDoc(doc(db, 'userSaved', userEmail), {
            email: userEmail,
            Saved: [],
        });
        return { Saved: [] };
    }
};

const UpdateSavedList = async (user, saved) => {
    const docRef = doc(db, 'userSaved', user?.primaryEmailAddress?.emailAddress);
    try {
        await setDoc(docRef, { Saved: saved });
    } catch (e) {
        console.log(e);
    }
};

export default {
    GetSavedList,
    UpdateSavedList,
};