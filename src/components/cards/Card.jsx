import Button from 'react-bootstrap/Button';

import { db } from '../../firebaseConfig';
import { auth } from '../../firebaseConfig';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { useUserValue } from '../../contexts/userContext';


export const CardComponent = ({product}) => {

  const { user } = useUserValue();

  const addToCart = async (product) => {

    try {

      const docRef = doc(db, "users", auth.currentUser.uid);

      
      let cart = user.cart;

        // Find the index of the product to update
      const productIndex = cart.findIndex(item => item.id === product.id);
      // If the product is already in the cart, increment the quantity
      if (productIndex !== -1){
        cart[productIndex].quantity += 1;

        await updateDoc(docRef, {
        cart: cart
        });

      }
      
      else {
        // Add the product to the cart
        cart.push(product);
        await updateDoc(docRef, {
          cart: arrayUnion({...product, quantity: 1})
        })

      }


    }catch(err){

      console.log(err);

    }

  }

  return (
    <div className="d-flex justify-content-center flex-wrap rounded-2 p-4 shadow bg-body" style={styles.card}>
      <div style={styles.imageContainer} className="d-flex align-items-center justify-content-center">
        <img src={product.image} alt={product.title} style={styles.image} />
      </div>
      <div style={styles.infoDiv} className="d-flex flex-column justify-content-end">
        <h5 style={styles.title} >{product.title}</h5>
        <h5 className="fw-bold">$ {product.price}</h5>
        <Button variant="primary" onClick={e => addToCart(product)}>Add to Cart</Button>
      </div>
    </div>
  );
}


const styles = {
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