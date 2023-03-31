import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	const handleWatch = (e) => {
        e.preventDefault();
        window.alert('Watch Feature not available yet...');
    }

	const handleMarketplace = (e) => {
        e.preventDefault();
        window.alert('Marketplace Feature not available yet...');
    }

	const handleGroups = (e) => {
        e.preventDefault();
        window.alert('Groups Feature not available yet...');
    }

	const handleGaming = (e) => {
        e.preventDefault();
        window.alert('Gaming Feature not available yet...');
    }

	return (
		<ul>
			{sessionUser && (
				<div className='nav-container'>
					<div className='nav-left'>
						<NavLink className={"navlink-home"} exact to="/">
							<img className='logo' src="https://goggbook-aws.s3.amazonaws.com/favicon.jpg" alt="goggbook-logo" />
						</NavLink>
					</div>
					<div className='nav-center'>
						<NavLink className="nav-home" activeClassName="active-home" exact to="/">
							<i className="fa-solid fa-house"></i>
						</NavLink>
						<button className='nav-button' onClick={handleWatch}>
							<i className="fa-regular fa-circle-play"></i>
						</button>
						<button className='nav-button' onClick={handleMarketplace}>
							<i className="fa-solid fa-shop"></i>
						</button>
						<button className='nav-button' onClick={handleGroups}>
							<i className="fa-solid fa-users"></i>
						</button>
						<button className='nav-button' onClick={handleGaming}>
							<i className="fa-solid fa-gamepad"></i>
						</button>
					</div>
					<div className='nav-right'>
						<ProfileButton user={sessionUser} />
					</div>
				</div>
			)}
		</ul>
	);
}

export default Navigation;
