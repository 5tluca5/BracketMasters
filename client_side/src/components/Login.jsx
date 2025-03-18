import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import './login.css'
import CHECK_AUTH from '../mutations/checkAuth';
import LOG_IN from '../mutations/login';
//
// this is the login component
function App({ onLogin, isLogin }) {

  let navigate = useNavigate();
  const { userData } = useQuery(CHECK_AUTH, { fetchPolicy: "network-only" });
  //state variable for the screen, admin or user
  const [screen, setScreen] = useState('auth');
  //store input field data, user name and password
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  // ✅ Query for checking authentication
  const { data: authData, loading: authLoading, error: authError } = useQuery(CHECK_AUTH, {
    fetchPolicy: "network-only",
  });

  // ✅ Mutation for login
  const [login, { data: loginData, loading: loginLoading, error: loginError }] = useMutation(LOG_IN, {
    onCompleted: (response) => {
      console.log("onCompleted triggered:", response);
      if (response?.login?.user) {
        console.log("Login successful:", response.login);
        onLogin(response.login.user);
        navigate('/main');
      } else {
        console.error("onCompleted received unexpected data:", response);
      }
    },
    onError: (err) => {
      console.error("Login failed:", err.message);
    }
  });



  // Login function
  const authenticateUser = async () => {
    console.log('Attempting login with:', { username, password });
    try {
      const response = await login({
        variables: { username, password }
      });

      console.log("GraphQL Response:", response);
    } catch (e) {
      console.error("Login error:", e);
    }
  };

  useEffect(() => {
    console.log("🔄 Loading:", authLoading);
    console.log("⚠ Error:", authError);
    console.log("📦 Data:", authData);
  
    if (!authLoading && authError) {
      console.error("❌ GraphQL query error:", authError);
    }
  
    if (!authLoading && authData?.me) {
      console.log("✅ User is logged in, redirecting...");
      onLogin(authData.me);
      navigate("/main");
    } else if (!authLoading) {
      console.log("🚫 User didn't log in");
    }
  }, [authData, authLoading, authError]);



  return (
    <div className=" justify-content-center align-items-center">
        <h3 className="text-center mb-4">Welcome Back!</h3>
        <Form className="w-100">
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">User Name</Form.Label>
            <Form.Control
              type="text"
              name="username"
              id="username"
              placeholder="Enter user name"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          {loginError && (<p className="text-danger mt-2">Username not found / password incorrect.</p>)}

          <div style={{ padding: '20px' }}>
            <Button className="w-100 mt-2" variant="primary" size="lg" onClick={authenticateUser}>
              Login
            </Button>
          </div>

          <p className="text-center mt-3" style={{ paddingTop: '10px' }}>
            Not a member? <Link to="/register" className="fw-bold">Register here</Link>
          </p>
        </Form>
     </div>
  );
}
//
export default App;

