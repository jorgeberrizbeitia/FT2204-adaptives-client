import { NavLink, useNavigate } from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

function MyNavbar(props) {
  const navigate = useNavigate();

  const logoutUser = () => {
    localStorage.removeItem("authToken");
    props.setIsLoggedIn(false);
    navigate("/");
  };

  if (props.isLoggedIn) {
    return (
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={NavLink} to="/">Home</Navbar.Brand>
          {/* <NavLink to="/">Home</NavLink> */}

          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/profile" end={true}>Profile Page</Nav.Link>
            <Nav.Link as={NavLink} to="/profile/edit">Edit Profile</Nav.Link>
            <Nav.Link as={NavLink} to="/product-list">Products Page</Nav.Link>
            <Nav.Link onClick={logoutUser}>Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    );
  } else {
    return (
      <Navbar bg="dark" variant="dark">
        <Container>
          <NavLink to="/">Home</NavLink>

          <NavLink to="/signup">Signup</NavLink>

          <NavLink to="/login">Login</NavLink>
        </Container>
      </Navbar>
    );
  }
}

export default MyNavbar;
