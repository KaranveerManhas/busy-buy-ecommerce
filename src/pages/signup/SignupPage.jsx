import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";

import { useUserValue } from "../../contexts/userContext";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";

export const SignupPage = () => {

    const { handleUserSignUp} = useUserValue();
    const navigate = useNavigate();

    onAuthStateChanged(auth, (user)=> {
        if(user) {
            
            navigate('/');
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        const userDetails = {
            name: e.target[0].value,
            email: e.target[1].value,
            password: e.target[2].value
        };

        handleUserSignUp(userDetails);
    }

    return (
        <Container className="d-flex justify-content-center align-content-center mt-5 p-sm-5">
            <Form className="p-5 bg-body-tertiary rounded-4 shadow w-sm-50 text-center" onSubmit={handleSubmit}>
                <Form.Label className="fs-1 fw-semibold">Sign Up</Form.Label>
                <Form.Group className="mb-3">
                    <FloatingLabel controlId="floatingName" label="Your Name" >
                        <Form.Control type="name" placeholder="Name" />
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3">
                    <FloatingLabel controlId="floatingEmail" label="Email address" >
                        <Form.Control type="email" placeholder="name@example.com" />
                    </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3">
                    <FloatingLabel controlId="floatingPassword" label="Password">
                        <Form.Control type="password" placeholder="Password" />
                    </FloatingLabel>
                </Form.Group>
                <Button variant="danger" style={styles.button} type="submit">Sign Up</Button>
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