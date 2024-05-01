import Container from "react-bootstrap/esm/Container";
import { CardComponent } from "../../components/cards/Card";



export const Home = () => {
    return (
        <Container className="d-flex justify-content-center border mt-5 p-3">
            <CardComponent />
        </Container>
    )
}