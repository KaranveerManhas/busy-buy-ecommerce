import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { NavbarComponent } from './components/navbar/Navbar';
import { Home } from './pages/home/Home';
import { LoginPage } from './pages/login/LoginPage';
import { SignupPage } from './pages/signup/SignupPage';
import { Cart } from './pages/cart/cart';
import { OrderPage } from './pages/orders/OrderPage';


import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebaseConfig';
import { useUserValue } from './contexts/userContext';
import { ProductsContextProvider } from './contexts/productContext';
import { doc, getDoc } from 'firebase/firestore';

function App() {

  const { setUser } = useUserValue();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <NavbarComponent />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: "signin",
          element: <LoginPage />
        },
        {
          path: "signup",
          element: <SignupPage />
        },
        {
          path: "cart",
          element: <Cart />
        },
        {
          path: "orders",
          element: <OrderPage />
        }
      ]
    }
  ])

  useEffect(() => {
    onAuthStateChanged(auth, (user)=> {
      if(user){
        
        const getUser = async () => {

          const userRef = doc(db, 'users', user.uid);

          const userDoc = await getDoc(userRef);

          setUser(userDoc.data());

        };

        getUser();

      }
    })
    //eslint-disable-next-line
  }, []);


  return (
    <ProductsContextProvider>
      <div className="App bg-body-tertiary">
        <RouterProvider router={router} />
      </div>
    </ProductsContextProvider>
    
  );
}

export default App;
