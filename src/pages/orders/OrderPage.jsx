import { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/esm/Container';

import {auth, db} from '../../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useUserValue } from './../../contexts/userContext';

export const OrderPage = () => {

    const {user, setUser} = useUserValue();

    useEffect(() => {
        if(auth.currentUser){
            const docRef = doc(db, 'users', auth.currentUser.uid);
            getDoc(docRef).then((userDoc)=> {
                setUser(userDoc.data());
            })
        }
        //eslint-disable-next-line
    }, []);

    if(!user){
        return <div>Loading...</div>
    }

    return (
        <div className="text-center mt-5">
            <h1>Your Orders</h1>

            <Container>
                {user.orders.map(order => (
                    <>
                    <h4 className='mt-5'>Ordered on : {order.date}</h4>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.products.map(product => (
                            <tr>
                                <td>{product.title}</td>
                                <td>${product.price}</td>
                                <td>{product.quantity}</td>
                                <td>${product.price * product.quantity}</td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan={3}></td>
                            <td>${user.orders[0].total}</td>
                        </tr>
                    </tbody>
                </Table>
                </>
                ))}
            </Container>
        </div>
    )
}