import Container from "react-bootstrap/esm/Container";
import { CardComponent } from "../../components/cards/Card";
import { useEffect, useState } from "react";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { GridLoader } from 'react-spinners';


const override = {
    display: 'block',
    margin: '100px auto 0'
}

export const Home = () => {

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("https://fakestoreapi.com/products");
            const data = await response.json();
            setProducts(data);
        }
        fetchData();
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);

    }, [])

    return (
        <div style={{height: "85vh"}}>
            <Container className="d-flex flex-wrap justify-content-evenly gap-4 mt-5 p-3 h-100">
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
                products.map((product) => <CardComponent product={product} />)}
            </Container>
        </div>
        
    )
}