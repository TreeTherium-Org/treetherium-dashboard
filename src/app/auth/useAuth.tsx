'use client';

import { useEffect, useState } from 'react';
import { auth, db } from '../../../firebase'; // Import Firebase auth and Firestore database.
import { onAuthStateChanged } from 'firebase/auth'; // Firebase function to track authentication changes.
import { doc, getDoc } from 'firebase/firestore'; // Firestore functions to get a document reference and retrieve data.

interface User {
  uid: string;
  email: string | null;
  role: string | null;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null); // State for user information.

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        fetchUserRole(currentUser.uid).then((role) => {
          setUser({ uid: currentUser.uid, email: currentUser.email, role });
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount.
  }, []);

  return { user }; // Return current user state.
};

// Function to fetch user's role from Firestore using their UID.
const fetchUserRole = async (uid: string) => {
  const docRef = doc(db, 'staff', uid); // Reference to Firestore document.
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return docSnap.data().role; // Return user's role.
  } else {
    console.error('No such document!');
    return null; // Handle missing document case.
  }
};
