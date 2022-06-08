import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {loginService} from "../../services/auth.services"

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

function Login(props) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const user = { email, password };

    try {
      const response = await loginService(user)
      const { authToken } = response.data
      localStorage.setItem("authToken", authToken)
      props.setIsLoggedIn(true)
      navigate("/profile")
    } catch(err) {
      if (err.response.status === 400) {
        setErrorMessage(err.response.data.errorMessage) 
      } else {
        navigate("/error")
      }
    }
  }

  return (
    <div >
    
      <h1>Log In</h1>    

      <div style={{display: "flex", alignItems:"center", flexDirection: "column"}}>
      <Form onSubmit={handleLogin} style={{width: "50%"}}>
        <Form.Group>
          <Form.Label>Email:</Form.Label>
          <Form.Control 
            type="email" 
            name="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control 
            type="password" 
            name="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </Form.Group>

        <Button variant="primary" type="submit">Log In</Button>

      </Form>

      { errorMessage && <Alert className="error-message" variant="danger">{errorMessage}</Alert> }

      </div>
    


    
    </div>
  )
}

export default Login