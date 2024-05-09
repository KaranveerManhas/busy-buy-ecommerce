import { createContext, useContext, useState } from "react";
import { db, auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";



import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const userContext = createContext();

export const useUserValue = () => {
  const value = useContext(userContext);
  return value;
}

export const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const toastSuccess = (message) => {
        toast.success(message)
    }
    const toastError = (errMsg) => {
        toast.error(errMsg);
    }

    const handleUserSignIn = () => {

    }

    const handleUserSignUp = async (newUser) => {
        
        try {

            await createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
            .then((userCredentials) => {
                setUser(userCredentials.user);
                console.log(userCredentials.user);
            })

            toastSuccess("You have successfully signed up.");

        }catch(err){
            const errMessage = err.message;
            const errCode = err.code;

            switch(errCode){
                case "auth/weak-password":
                    setErrorMessage("The password is too weak.");
                    break;
                case "auth/email-already-in-use":
                    setErrorMessage("The email is already in use.");
                    break;
                case "auth/invalid-email":
                    setErrorMessage("The email is invalid.");
                    break;
                default:
                    setErrorMessage(errMessage);
                    break;
            }

            setTimeout(() => {
                toastError(errorMessage);
            }, 2000)

        }
    }
    
    return (
        <userContext.Provider value={{user, setUser, error, setError, errorMessage, handleUserSignIn, handleUserSignUp}}>
            {children}
            <ToastContainer />
        </userContext.Provider>
    );

}