import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from './Utils/Common';
import {Image, Button, Row, Form, FormGroup, ControlLabel, FormControl, HelpBlock, InputGroup} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import {useEffect} from "react";
import Cookies from 'js-cookie';
import history from './history';
import {Link, Navigate, Route, Router, useHref } from 'react-router-dom';
//import { useRouter } from "next/router";
function Login(props) {
  const [loading, setLoading] = useState(false);
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  //const router = useRouter();
  const params = JSON.stringify({

    "usernameOrEmail":usernameOrEmail,
    "password":password
    
    });
  // const isActive = (route) => {
  //     return router.route === route ? "active" : null;
  // };
  
  // const isParentActive = (route) => {
  //     return router.route.indexOf(route) > -1 ? "active" : null;
  // };
  var config = {
      headers: {
        "Content-Type": 'application/json',
      },
  }; 
  // handle button click of login form
  const handleLogin = async () => {
    setError(null);
    setLoading(true);
    axios.post('http://localhost:8080/api/auth/signin',{usernameOrEmail:usernameOrEmail, password:password}, config).then(response => {
      setLoading(false);
      console.log(response.data);
      setUserSession(response.data.accessToken, usernameOrEmail);
      history.push('/dashboard');
      window.location.reload(false);
      // <Link 
      // to={'/dashboard'}{...props}/>
      //window.open('/dashboard')
    }).catch(error => {
      setLoading(false);
      if (error.response) {
        alert('There is something wrong. Please try again');
      } else if (error.request) {
        // client never received a response, or request never left
      } else {
        // anything else
      }
    });
  }
 
  const handleEmailChange = (emails) => {
    setUsernameOrEmail(emails.target.value);
  }
  const handlePasswordChange = (password) => {
    setPassword(password.target.value);
  }
  return (
    <div>
      Login<br /><br />
      {/* <div>
        Username<br />
        <input type="text" {...usernameOrEmail} autoComplete="new-password" />
      </div> */}
      <Form>
        <Form.Group className="mb-3" >
          <Form.Label>Email address</Form.Label>
          <Form.Control className="mx-auto" type="text" placeholder="Enter email" style={{maxWidth:"200px", alignItems:"center"}} value={usernameOrEmail} onChange={handleEmailChange}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control className="mx-auto"  type="password" placeholder="Password" style={{maxWidth:"200px"}} value={password} onChange={handlePasswordChange}/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button href="#0" variant="primary" type="submit" onClick={handleLogin}>
          Submit
        </Button>
      </Form>
     </div>
  );
}









      {/* <div style={{ marginTop: 10 }}>
        Password<br />
        <input type="password" {...password} autoComplete="new-password" />
      </div>
      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />
    </div>
  );
}
 
const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);
 
  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
} */}
 
export default Login;