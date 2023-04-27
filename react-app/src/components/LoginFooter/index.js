import React from 'react';
import "./LoginFooter.css";

const LoginFooter = () => {

    function handleLinkedIn() {
        window.open("https://www.linkedin.com/in/ryangoggin20/", "_blank");
    }

    function handleGithub() {
        window.open("https://github.com/ryangoggin", "_blank");
    }

    function handlePortfolio() {
        window.open("https://ryangoggin.github.io/", "_blank");
    }

    function handleGoggInn() {
        window.open("https://ryangoggin-gogginn.onrender.com/", "_blank");
    }

    function handlePixelPal() {
        window.open("https://pixel-pal.onrender.com/", "_blank");
    }


    return (
        <div className='footer-container'>
            <div className='footer-top'>
                <button className='footer-button' onClick={handleLinkedIn}>
                    LinkedIn
                </button>
                <button className='footer-button' onClick={handleGithub}>
                    Github
                </button>
                <button className='footer-button' onClick={handlePortfolio}>
                    Portfolio
                </button>
            </div>
            <div className='footer-middle'>
                <p className='footer-text'>
                    Python
                </p>
                <p className='footer-text'>
                    Flask
                </p>
                <p className='footer-text'>
                    SQL
                </p>
                <p className='footer-text'>
                    SQLAlchemy
                </p>
                <p className='footer-text'>
                    JavaScript
                </p>
                <p className='footer-text'>
                    React
                </p>
                <p className='footer-text'>
                    Redux
                </p>
                <p className='footer-text'>
                    Node
                </p>
                <p className='footer-text'>
                    HTML
                </p>
                <p className='footer-text'>
                    CSS
                </p>
                <p className='footer-text'>
                    Github
                </p>
            </div>
            <div className='footer-bottom'>
                <p className='footer-text bottom'>
                    Also Check Out:
                </p>
                <button className='footer-button' onClick={handleGoggInn}>
                    GoggInn
                </button>
                <button className='footer-button' onClick={handlePixelPal}>
                    PixelPal
                </button>
            </div>
            <div className='footer-copyright'>
                <p className='copyright-text'>
                  Ryan Goggin © 2023
                </p>
            </div>
        </div>
    );
}

export default LoginFooter;
