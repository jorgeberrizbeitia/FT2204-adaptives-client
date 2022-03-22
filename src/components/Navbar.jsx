import { NavLink, useNavigate } from "react-router-dom"

function Navbar(props) {

  const navigate = useNavigate()

  const logoutUser = () => {
    localStorage.removeItem("authToken")
    props.setIsLoggedIn(false)
    navigate("/")
  }

  if (props.isLoggedIn) {
    return (
      <nav>
  
        <NavLink to="/">
          Home
        </NavLink>
  
        <NavLink to="/profile">
          Profile Page
        </NavLink>
  
        <button onClick={logoutUser}>Logout</button>
  
      </nav>
    )
  } else {
    return (
      <nav>
  
        <NavLink to="/">
          Home
        </NavLink>
  
        <NavLink to="/signup">
          Signup
        </NavLink>
  
        <NavLink to="/login">
          Login
        </NavLink>

      </nav>
    )
  }

}

export default Navbar