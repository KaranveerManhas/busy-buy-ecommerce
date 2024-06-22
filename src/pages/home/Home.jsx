import Container from "react-bootstrap/esm/Container";
import { CardComponent } from "../../components/cards/Card";

import { GridLoader } from 'react-spinners';
import { FilterComponent } from "../../components/filter_component/filterComponent";
import { HeaderComponent } from "../../components/header/headerComponent";
import { useProductsValue } from "../../contexts/productContext";


const override = {
    display: 'block',
    margin: '100px auto 0'
}

export const Home = () => {

    const {products, isLoading} = useProductsValue();
    

    return (
        <div>
            <HeaderComponent />
            <div className="d-flex container-md">
                <FilterComponent />
                <Container className="d-flex flex-wrap gap-4 justify-content-sm-start">
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
                    products.map((product) => <CardComponent product={product} key={product.id} />)}
                </Container>
            </div>
        </div>
        
    )
}