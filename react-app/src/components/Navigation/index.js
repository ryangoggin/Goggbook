import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

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
