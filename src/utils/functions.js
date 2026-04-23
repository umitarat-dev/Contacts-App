import firebase from "./firebase";
import { 
    getDatabase, 
    ref, 
    push, 
    set,
    // onValue, // App.jsx içine alındı.
    remove,
    update,
} from "firebase/database";
import { auth } from "./firebase";



// Cread - Veri Yazma;
export const AddUser = (formData) => {
    
    const user = auth.currentUser;
    // if (!user) {
    //   return Promise.reject(new Error("No authenticated user"));
    // }
    if (!user) return;

    const db = getDatabase(firebase);
    const userRef = ref(db, `users/${user.uid}`);
    const newUserRef = push(userRef);

    return set(newUserRef, {
        user_name: formData.userName,
        phone_number: formData.phoneNumber,
        gender: formData.gender
    });
};

// Delete - Veri Silme;
export const DeleteUser = (userId) => {

  const user = auth.currentUser;
  if (!user) return;

  const db = getDatabase(firebase);
  const userRef = ref(db, `users/${user.uid}/${userId}`);

  return remove(userRef);
};

// Update - Veri Güncelleme;
export const UpdateUser = (id, formData) => {

  const user = auth.currentUser;
  if (!user) return;

  const db = getDatabase(firebase);
  const userRef = ref(db, `users/${user.uid}/${id}`);

  return update(userRef, {
    user_name: formData.userName,
    phone_number: formData.phoneNumber,
    gender: formData.gender
  });
};

