import { createContext, useContext, useState } from "react";

const userContext = createContext();

export const useValue = () => {
  const value = useContext(userContext);
  return value;
}

export const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(false);
    const [errorCode, setErrorCode] = useState(null);

    const handleUserSignIn = () => {

    }

    const handleUserSignUp = () => {

    }
    
    return (
        <userContext.Provider value={{user, setUser, error, setError, errorCode, setErrorCode, handleUserSignIn, handleUserSignUp}}>
            {children}
        </userContext.Provider>
    );

}