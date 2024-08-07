import Container from "react-bootstrap/esm/Container";
import { GridLoader } from 'react-spinners';
import { useUserValue } from "../../contexts/userContext"
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from "react";
import { auth, db } from "../../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';



const override = {
  display: 'block',
  margin: '100px auto 0'
}


export const Cart = () => {

    const { user, setUser } = useUserValue();
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
      const getUser = async () => {
        if(auth.currentUser){
          const userRef = doc(db, 'users', auth.currentUser.uid);
          const userDoc = await getDoc(userRef);
          setUser(userDoc.data());
        }
      }
      getUser();
      //eslint-disable-next-line
    }, [])

    useEffect(() => {
  
      if(user && user.cart){
        const cartTotal = user.cart.reduce((ans, product)=> {
          return ans + (product.price * product.quantity);
        }, 0);
        setTotal(cartTotal);
      }
      // eslint-disable-next-line
    }, [user]);

    const increaseProductQuantity = async (product) => {

      const updatedCart = [...user.cart];
      updatedCart[updatedCart.indexOf(product)].quantity++;
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        cart: updatedCart,
      });
      setUser({...user, cart: updatedCart });

    }

    const reduceProductQuantity = async (product) => {

      if(product.quantity > 1){
        const updatedCart = [...user.cart];
        updatedCart[updatedCart.indexOf(product)].quantity--;
        await updateDoc(doc(db, 'users', auth.currentUser.uid), {
          cart: updatedCart,
        });
        setUser({...user, cart: updatedCart });
      }
      else{
        const updatedCart = [...user.cart];
        updatedCart.splice(updatedCart.indexOf(product), 1);
        await updateDoc(doc(db, 'users', auth.currentUser.uid), {
          cart: updatedCart,
        });
        setUser({...user, cart: updatedCart });
      }
    }

    const handleUserCheckout = async () => {

      if(user.cart.length > 0){

        const allProducts = user.cart.reduce((products, currentProduct)=> {
          return [...products, {
            id: currentProduct.id,
            title: currentProduct.title,
            price: currentProduct.price,
            quantity: currentProduct.quantity,
          }];
        }, []);

        const currentOrder = {
          products: allProducts,
          total: total,
          date: new Date().toLocaleDateString(),
        }
        
        const docRef = doc(db, 'users', auth.currentUser.uid);

        await updateDoc(docRef, {
          orders: [...user.orders, currentOrder],
          cart: []
        });

        setUser({
          ...user,
          orders: [...user.orders, currentOrder],
          cart: []
        })

        navigate('/orders');

      }

    }

    if (!user){
      return <Container>
        <GridLoader 
          color="#ff9a01"
          cssOverride={override}
          size={20}
          aria-label="Loading Products"
          data-testid="loader"
        />
      </Container>
    }

    return (
        <div className="text-center">
            <h1 className="p-3">Cart</h1>
            <h3>Total : {total} </h3>
            <Button className="mt-3" onClick={handleUserCheckout}>Checkout</Button>
            <Container >
                <div className="cart-items d-flex gap-3 justify-content-center p-5">
                    {user.cart.map((product, index) => (
                        <div className="d-flex justify-content-center flex-wrap rounded-2 p-4 shadow bg-body" style={styles.card} key={index} >
                        <div style={styles.imageContainer} className="d-flex align-items-center justify-content-center">
                        <img src={product.image} alt={product.title} style={styles.image} />
                        </div>
                        <div style={styles.infoDiv} className="d-flex flex-column justify-content-end">
                            <h5 style={styles.title} >{product.title}</h5>
                            <h5 className="fw-bold">$ {product.price}</h5>
                            <div className="qty-container d-flex justify-content-center align-content-center">
                                <Button className="fs-5 btn-danger rounded-0" onClick={e=>reduceProductQuantity(product)}>&#8722;</Button>
                                <div className="fs-4 bg-body-secondary" style={styles.qtyText}>{product.quantity}</div>
                                <Button className="fs-5 btn-success rounded-0" onClick={e=>increaseProductQuantity(product)}>&#43;</Button>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </Container>
            
        </div>
    )

}



const styles = {
    qtyText: {
        width: "70px",
    },
    card: {
      width: '250px',
      height: "500px",
    },
    imageContainer: {
      width: "100%",
      height: "70%",
    },
    image: {
      width: "170px",
    },
    infoDiv: {
      height: "30%",
      alignSelf: "flex-end"
    },
    title: {
      display: "-webkit-box",
      WebkitLineClamp: "2",
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }