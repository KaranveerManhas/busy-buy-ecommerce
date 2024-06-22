import { createContext, useContext, useEffect, useState } from "react";

import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";


const ProductsContext = createContext();

export const useProductsValue = () => {
    const value = useContext(ProductsContext);
    return value;
}

export const ProductsContextProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData(){
            const querySnapshot = await getDocs(collection(db, 'products'));
            const productData = [];
            querySnapshot.forEach((doc)=>{
                productData.push(doc.data());
            });
            setProducts(productData);
        }
        fetchData();
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, [])


    return (
        <ProductsContext.Provider value={{ products, isLoading }}>
            {children}
        </ProductsContext.Provider>
    )

}

