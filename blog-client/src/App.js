import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

import SignUp from "./Components/Sign-up/SignUp.component";
import SignIn from "./Components/Sign-In/SignIn.component";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="sign-up" element={<SignUp />} />
                <Route path="sign-in" element={<SignIn />} />
            </Routes>
        </Router>
    );
}

export default App;
