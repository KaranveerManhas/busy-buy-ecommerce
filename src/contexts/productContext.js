import { createContext, useContext, useState } from "react";

import { db } from "../firebaseConfig";


const ProductsContext = createContext();

export const useProductsValue = () => {
    const value = useContext(ProductsContext);
    return value;
}

export const ProductsContextProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
}

