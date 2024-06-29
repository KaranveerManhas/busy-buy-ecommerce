import Container from "react-bootstrap/esm/Container";
import { CardComponent } from "../../components/cards/Card";

import { GridLoader } from 'react-spinners';
import { FilterComponent } from "../../components/filter_component/filterComponent";
import { HeaderComponent } from "../../components/header/headerComponent";
import { useProductsValue } from "../../contexts/productContext";
import { useEffect, useRef, useState } from "react";

const override = {
    display: 'block',
    margin: '100px auto 0'
}

export const Home = () => {

    const {products, isLoading, filterProducts, filteredProducts} = useProductsValue();

    const [priceRange, setPriceRange] = useState(500);
    const [query, setQuery] = useState("");
    const[categories, setCategories] = useState({
        mensClothing: false,
        electronics: false,
        jewelry: false,
        womensClothing: false
    })

    const [isFiltering, setIsFiltering] = useState(false);

    const hasPageBeenRendered = useRef(false);

    useEffect(() => {
        if (hasPageBeenRendered.current){
            filterProducts({
                priceRange,
                query,
                categories
            });
            setIsFiltering(true);
        }

        hasPageBeenRendered.current = true;
        //eslint-disable-next-line
    }, [priceRange, query, categories])
    

    return (
        <div>
            <HeaderComponent setQuery={setQuery} />
            <div className="d-flex container-md">
                <FilterComponent
                setPriceRange={setPriceRange}
                priceRange={priceRange}
                setCategories={setCategories} />

                <Container className="d-flex flex-wrap gap-4 justify-content-sm-center">
                    {isLoading ? 
                    <GridLoader 
                        color="#ff9a01"
                        loading={isLoading}
                        cssOverride={override}
                        size={20}
                        aria-label="Loading Products"
                        data-testid="loader"
                    />
                    : 
                    (isFiltering ? 
                        filteredProducts.map((product) => <CardComponent product={product} key={product.id} />) 
                        : 
                        products.map((product) => <CardComponent product={product} key={product.id} />)
                    )
                    }
                </Container>
            </div>
        </div>
        
    )
}