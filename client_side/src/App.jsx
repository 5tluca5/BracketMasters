import { useState } from 'react'
import { Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";

import Login from './components/Login'
import Home from './components/Home'
import SignUp from './components/Signup'
import Main from './components/Main'
import PlayerList from './components/playerList';
import TournamentList from './components/tournamentList';
import CreateTournament from './components/CreateTournament';
import CreateUser from './components/CreateUser';
import AssignPlayerToTournament from './components/AssignPlayerToTournament';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Add state for login status
  const [user, setUser] = useState(null);
  let username = '';

  const handleLogin = (User) => {
    setIsLoggedIn(true);
    setUser(User);
    console.log('login');

  }

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    console.log('logout');
  }

  return (
    <>
      <Router>
        <Home onLogin={handleLogin} />
        <div className=" justify-content-center align-items-center">
          <Container className="login-container shadow-lg p-4">
            <Routes>
              <Route index element={<Login onLogin={handleLogin} isLogin={isLoggedIn} />} />
              <Route path="register" element={<SignUp onCreate={handleLogin}></SignUp>}></Route>
              <Route path="main" element={<Main user={user} />}></Route>
              <Route path="playerlist" element={<PlayerList />}></Route>
              <Route path="tournamentlist" element={<TournamentList user={user}/>}></Route>
              <Route path="createtournament" element={<CreateTournament />}></Route>
              <Route path="createuser" element={<CreateUser/>}></Route>
              <Route path="assignplayer" element={<AssignPlayerToTournament/>}></Route>
            </Routes>
          </Container>
        </div>

      </Router>


      <footer className="mt-5">
        <p className="text-center text-muted" style={{ fontSize: "small" }}>
          © Copyright 2025 COMP308 ASM2
        </p>
        <p className="text-center text-muted" style={{ fontSize: "small" }}>
          Created by Tsz Him Ng
        </p>
      </footer>

      <ToastContainer position="top-center" autoClose={3000} />
    </>

  )
}

export default App
