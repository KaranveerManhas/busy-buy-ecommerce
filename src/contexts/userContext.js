import { createContext, useContext, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { doc, setDoc } from "firebase/firestore";


const userContext = createContext();

export const useUserValue = () => {
  const value = useContext(userContext);
  return value;
}

export const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(false);

    const toastSuccess = (message) => {
        toast.success(message)
    }
    const toastError = (errMsg) => {
        toast.error(errMsg);
    }

    const handleUserSignOut = () => {
        signOut(auth)
        .then(()=> {
            setUser(null);
            toastSuccess("User Signed Out Successfully");
        })
    }

    const handleUserSignIn = async (userCredentials) => {

        const {email, password} = userCredentials;

        try {

            await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUser(userCredential.user);
            });
            toastSuccess("You have successfully signed in.");

        }catch(err){
            const errMessage = err.message;
            const errCode = err.code;

            switch(errCode) {
                case "auth/invalid-credential":
                    toastError("Invalid Credentials");
                    break;
                case "auth/invalid-email":
                    toastError("The email is invalid.");
                    break;
                default:
                    toastError(errMessage);
                    break;
            }

        }

    }

    const handleUserSignUp = async (newUser) => {
        
        try {

            await createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
            .then((userCredentials) => {
                const userRef = doc(db, 'users', userCredentials.user.uid);
                setDoc(userRef, {
                    name: newUser.name,
                    email: userCredentials.user.email,
                    cart: [],
                    orders: []
                });
                setUser(userCredentials.user);
            })
            
            toastSuccess("You have successfully signed up.");

        }catch(err){
            const errMessage = err.message;
            const errCode = err.code;

            switch(errCode){
                case "auth/weak-password":
                    toastError("The password is too weak.");
                    break;
                case "auth/email-already-in-use":
                    toastError("The email is already in use.");
                    break;
                case "auth/invalid-email":
                    toastError("The email is invalid.");
                    break;
                default:
                    toastError(errMessage);
                    break;
            }

        }
    }
    
    return (
        <userContext.Provider value={{user, setUser, error, setError, handleUserSignIn, handleUserSignOut, handleUserSignUp}}>
            {children}
            <ToastContainer />
        </userContext.Provider>
    );

}