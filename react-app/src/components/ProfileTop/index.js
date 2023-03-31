import React from 'react';
import { NavLink } from 'react-router-dom';
import './ProfileTop.css'


function ProfileTop({ profileUser, profileFriends }) {
    let friendsArr = [];
    if (profileFriends) friendsArr = Object.values(profileFriends);

    const handleFriends = (e) => {
        e.preventDefault();
        window.alert('Friends section not available yet...');
    }

    return (
        <div className='profile-top-container'>
            <div className='profile-top-upper'>
                <div className='big-profile-pic-container'>
                    <img className='big-profile-pic' src={`${profileUser?.profilePic}`} alt={`${profileUser?.firstName} ${profileUser?.lastName} Profile`} />
                </div>
                <div className='profile-top-info'>
                    <h1 className='profile-top-fullname'>{profileUser?.firstName} {profileUser?.lastName}</h1>
                    <h3 className='profile-top-friends'>{friendsArr.length} friends</h3>
                </div>
            </div>
            <div className='profile-top-lower'>
                <NavLink className="profile-posts" activeClassName="active-posts" exact to={`/users/${profileUser?.id}`}>
                    <p className='posts-text'>
                        Posts
                    </p>
                </NavLink>
                <button className='profile-section-button' onClick={handleFriends}>
                    <p className='friends-text'>
                        Friends
                    </p>
                </button>
            </div>
        </div>
    );
};

export default ProfileTop;
