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
    const [filteredProducts, setFilteredProducts] = useState([]);

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

    const filterProducts = (filterObj) => {
        
        const {priceRange, 
            query, 
            categories: {mensClothing, womensClothing, electronics, jewelry}
        } = filterObj;

        let toBeFilteredProducts = products;

        if(query){
            toBeFilteredProducts = toBeFilteredProducts.filter(product => {return product.title.toLowerCase().includes(query.toLowerCase())});
        }

        if (mensClothing || womensClothing || jewelry || electronics) {
            toBeFilteredProducts = toBeFilteredProducts.filter((product) => {
              if (mensClothing && product.category === "men's clothing") {
                return true;
              }
              if (womensClothing && product.category === "women's clothing") {
                return true;
              }
              if (electronics && product.category === "electronics") {
                return true;
              }
              if (jewelry && product.category === "jewelery") {
                return true;
              }
              return false;
            });
          }
      
        if (priceRange) {
            toBeFilteredProducts = toBeFilteredProducts.filter((product) => {
                return product.price < priceRange;
            });
        }

        setFilteredProducts(toBeFilteredProducts);

    }


    return (
        <ProductsContext.Provider value={{ products, isLoading, filteredProducts, filterProducts }}>
            {children}
        </ProductsContext.Provider>
    )

}

