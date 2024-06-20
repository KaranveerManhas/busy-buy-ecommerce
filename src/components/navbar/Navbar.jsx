import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, Outlet } from 'react-router-dom';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { useUserValue } from '../../contexts/userContext';


export const NavbarComponent = () => {

  const [colorMode, setColorMode] = useState("light");
  const {user, handleUserSignOut} = useUserValue();
  
  useEffect(() => {


  })

  useEffect(() => {

    document.querySelector('html').setAttribute("data-bs-theme", colorMode);

  }, [colorMode])

  const toggleColorMode = () => {
    if (colorMode === "light") {
      setColorMode("dark");
    }
    else{
      setColorMode("light");
    }

  }


  return (
    <>
    <Navbar expand="lg" className="bg-body shadow">
      <Container>
        <div className="fs-2">
          <NavLink to={'/'} style={styles.link}>BUSY BUY</NavLink>
        </div>
        <Navbar.Collapse className="justify-content-end">
          <Nav className="gap-3">
            <NavLink to={'/'} style={styles.link}>
              <img src="/images/home.png" style={styles.homeIcon} alt="Home button" />
              Home
            </NavLink>
            {user ? 
              <>
                <NavLink to={'/orders'} style={styles.link}>
                  <img src="/images/orders.png" alt="Orders Button" style={styles.homeIcon} />
                  Orders
                </NavLink>
                <NavLink to={'/cart'} style={styles.link}>
                  <img src="/images/cart.png" alt="Cart Button" style={styles.homeIcon} />
                  Cart
                </NavLink>
                <NavLink to={"/signin"} style={styles.link}>
                  <img src="/images/enter.png" alt="Sign in Button" style={styles.loginIcon} onClick={handleUserSignOut} />
                  Sign Out
                </NavLink>
              </> 
              : 
              <NavLink to={"/signin"} style={styles.link}>
                <img src="/images/enter.png" alt="Sign in Button" style={styles.loginIcon} />
                Sign In
              </NavLink>
            }
            
            <img src="/images/colorModes.png" style={styles.colorModeIcon} onClick={toggleColorMode} alt="Color Mode icon" />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Outlet />
    </>
  );
}


const styles = {
  homeIcon: {
    width: '30px',
    height: '30px',
    marginRight: '10px',
    marginTop: "-5px"
  },
  loginIcon: {
    width: '25px',
    height: '25px',
    marginRight: '10px'
  },
  link: {
    textDecoration: "none",
    color: "#ff9a01",
    fontWeight: "600"
  },
  colorModeIcon: {
    width: '30px',
    height: '30px',
    cursor: 'pointer'
  }
}