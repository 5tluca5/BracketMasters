import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import SIGN_UP from '../mutations/signup';

//
import './login.css'
import Container from 'react-bootstrap/esm/Container';
// this component is used to create a new user


function CreateUser({ onCreate }) {
  let navigate = useNavigate()
  //
  const [user, setUser] = useState({ _id: '', username: '', email: '', password: '', repassword: '' });
  const [showLoading, setShowLoading] = useState(false);
  const [signup, { data, loading, error }] = useMutation(SIGN_UP);
  const [passwordError, setError] = useState("");
  const apiUrl = "api/";


  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  const handleSignup = async () => {
    setShowLoading(true);

    if (user.password !== user.repassword) {
      setError("Passwords do not match!");
      setShowLoading(false);
      return;
    }

    setError(""); // Clear error if passwords match

    try {
      const { data } = await signup({
        variables: { username: user.username, email: user.email, password: user.password, role: "Player"},
      });
      setShowLoading(false);
      console.log("GraphQL response:", data); // Log the response

      if (!data || !data.signup || !data.signup.user) {
        setError("Signup failed. Please try again.");
        return;
      }
      
      console.log("User created:", data.signup.user); // Log the created user

      onCreate(data.signup.user);
      navigate('/main');
      console.log("User signed up:", data.signup.user);
    } catch (err) {
      console.error("Signup error:", err);
      setShowLoading(false);
    }
  };

  const saveUser = (e) => {
    setShowLoading(true);
    e.preventDefault();

    if (user.password !== user.repassword) {
      setError("Passwords do not match!");
      setShowLoading(false);
      return;
    }

    setError(""); // Clear error if passwords match

    const data = { username: user.username, email: user.email, password: user.password, role: "Player" };
    //use promises
    // axios.post(apiUrl, data)
    // .then((result) => {
    //   setShowLoading(false);
    //   onCreate(result.data._id);
    //   navigate('/main');
    //   // navigate('/show/' + result.data._id)
    // }).catch((error) => setShowLoading(false));
  };
  // handles onChange event
  const onChange = (e) => {
    e.persist();
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  return (
    <div className=" justify-content-center align-items-center"
    >
        <h3 className="text-center mb-4">Sign yourself up.</h3>
        <Form className="w-100">
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">User Name</Form.Label>
            <Form.Control
              type="text"
              name="username"
              id="username"
              placeholder="Enter user name"
              onChange={onChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Email</Form.Label>
            <Form.Control
              type="text"
              name="email"
              id="email"
              placeholder="Enter email"
              onChange={onChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
              onChange={onChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Comform Password</Form.Label>
            <Form.Control
              type="password"
              name="repassword"
              id="repassword"
              placeholder="Comform password"
              onChange={onChange}
            />
            {passwordError && <p className="text-danger mt-2">{passwordError}</p>}
          </Form.Group>

          <div style={{ padding: '20px' }}>
            <Button className="w-100 mt-2" variant="primary" size="lg" onClick={handleSignup}>
              Register
            </Button>
          </div>
        </Form>
        <p className="text-center mt-3" style={{ paddingTop: '10px' }}>
                    Got an account? <Link to="/" className="fw-bold">Sign in here</Link>
                  </p>
    </div>
  );
}
//
export default CreateUser;
