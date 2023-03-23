import React from 'react';
import { useSelector } from 'react-redux';
import LoginFormPage from '../LoginFormPage';
import Feed from '../Feed';
import "./Homepage.css";
import Navigation from '../Navigation';

const Homepage = () => {
    const user = useSelector(state => state.session.user)

    return (
        <>
        {user ? (
            <>
                <Navigation />
                <Feed />
            </>
          ) : (
            <div className='logged-out-homepage-container'>
                <div className='logged-out-homepage-top'>
                    <div className='logged-out-homepage-top-left'>
                        <h1 className="app-name">goggbook</h1>
                        <h2 className="app-motto">Connect with friends and the world around you on Goggbook.</h2>
                    </div>
                    <div className='logged-out-homepage-top-right'>
                        <LoginFormPage />
                    </div>
                </div>
                <div className='logged-out-homepage-bottom'>

                </div>
            </div>
          )}
          </>
    )
}

export default Homepage;
