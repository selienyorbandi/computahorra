import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { createContext, useEffect, useState, useContext } from "react";
import { getFirestoreAuth } from "../firebase/config";

const AuthContext = createContext([]);
const auth = getFirestoreAuth();
export const useAuthContext = () => useContext(AuthContext);

export function AuthContextProvider({children}) {
  
  const [user, setUser] = useState(null);

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logInGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  const logInFacebook = () => {
    const facebookProvider = new FacebookAuthProvider();
    return signInWithPopup(auth, facebookProvider);
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
    });
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      signUp,
      logIn,
      logOut,
      logInGoogle,
      logInFacebook     
    }}>
      {children}
    </AuthContext.Provider>
  );
}
