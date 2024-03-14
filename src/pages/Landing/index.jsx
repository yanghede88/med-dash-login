import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './styles.css';
import logo from "@/assets/dashboard_icon.svg";

const LandingPage = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleLoginClick = () => {
        navigate('/login'); // Navigate to the login page
    };

    return (
        <div className="container">
            <div className="logo-container">
                <img className="logo" src={logo} alt =""/> {/* Use the logo image */}
                <span className="logo-text">MedDash</span> {/* Text next to the logo */}
            </div>
            
            <h1 className="title">Welcome to MedDash!</h1>
            <p className="paragraph">MedDash aims to consolidate multiple sources of health data into a comprehensive medical dashboard</p>
            <button className="button" onClick={handleLoginClick}>Login</button> {/* Button to navigate to the login page */}
        </div>
    );
};

export default LandingPage;


