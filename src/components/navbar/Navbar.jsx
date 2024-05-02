import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, Outlet } from 'react-router-dom';



export const NavbarComponent = () => {

  const [colorMode, setColorMode] = useState("light");

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
    <Navbar expand="lg" className="bg-body-tertiary shadow">
      <Container className="position-relative">
        <Navbar.Brand href="/" className="fs-2">
          <NavLink to={'/'} style={styles.link}>BUSY BUY</NavLink>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="gap-3">
            <NavLink to={'/'} style={styles.link}>
              <img src="/images/home.png" style={styles.homeIcon} alt="Home button" />
              Home
            </NavLink>
            
            <NavLink to={"/signin"} style={styles.link}>
              <img src="/images/enter.png" alt="Sign in Button" style={styles.loginIcon} />
              Sign In
              </NavLink>
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