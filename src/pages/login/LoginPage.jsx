import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import { NavLink } from 'react-router-dom';

export const LoginPage = () => {

    return (
        <Container className="d-flex justify-content-center  mt-5 p-5">
            <Form className="m-5 p-5 pt-3 bg-body-tertiary rounded-4 w-50 shadow">
                <p className="fs-1">Sign In</p>
                <Form.Group className="mb-3">
                    <FloatingLabel controlId="floatingInput" label="Email address" >
                        <Form.Control type="email" placeholder="name@example.com" />
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3">
                    <FloatingLabel controlId="floatingPassword" label="Password">
                        <Form.Control type="password" placeholder="Password" />
                    </FloatingLabel>
                </Form.Group>
                <Button variant="danger" style={styles.button} type="submit">Sign In</Button>
                <p className="mt-3">
                    Don't have an account?  <NavLink to={'/signup'} style={styles.link}>Sign Up</NavLink>
                </p>
            </Form>
        </Container>
    )
}

const styles = {
    link: {
        textDecoration: "none",
        color: "#ff9a01"
    },
    button: {
        backgroundColor: "#ff9a01",
        borderColor: "#ff9a01"
    }
}