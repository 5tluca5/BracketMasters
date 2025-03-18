
import React, { Component } from 'react';
import '../App.css';

import Login from './Login'

// this is the home page component
function Home(onLogin) {


    return (
        <div className='App' style={{ position: "relative", overflow: "hidden" }}>
            <h1 className="fw-bold text-primary display-3">BracketMasters</h1>
            <p className="text-muted fs-5 fst-italic">
                The best gaming tournaments and players system you ever wanted.
            </p>
            
        </div>

        
    );

}
// withRouter will pass updated match, location, and history props 
// to the wrapped component whenever it renders.
export default Home;