import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../../firebase'; // Adjust path to your Firebase config file.

export const handleGoogleSignIn = async (router: string[]) => {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider); // Trigger Google sign-in popup.
    const user = result.user; // Get user data from result.

    // Create or update user data in Firestore.
    await setDoc(doc(db, 'staff', user.uid), {
      email: user.email,
      createdAt: new Date(),
      isAgreed: true, // Assume agreement via Google sign-in.
      role: 'admin',
    });

    router.push('/ecommerce'); // Navigate to sign-in page after successful sign-in.
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error signing in with Google:', error.message);
      alert('Google Sign-in failed: ' + error.message); // Show alert on failure.
    } else {
      console.error('Unknown error', error);
      alert('An unknown error occurred');
    }
  }
};
