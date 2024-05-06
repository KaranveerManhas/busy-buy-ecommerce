import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { NavbarComponent } from './components/navbar/Navbar';
import { Home } from './pages/home/Home';
import { LoginPage } from './pages/login/LoginPage';
import { SignupPage } from './pages/signup/SignupPage';
import { Cart } from './pages/cart/cart';
import { OrderPage } from './pages/order/OrderPage';

function App() {

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

  return (
    <div className="App bg-body-tertiary">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
