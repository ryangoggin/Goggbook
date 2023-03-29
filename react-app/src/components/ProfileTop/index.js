import React from 'react';
import './ProfileTop.css'


function ProfileTop({ profileUser, profileFriends }) {
    const friendsArr = Object.values(profileFriends);

    return (
        <div className='profile-top-container'>
            <div className='profile-top-upper'>
                <div className='big-profile-pic-container'>
                    <img className='big-profile-pic' src={`${profileUser.profilePic}`} alt={`${profileUser.firstName} ${profileUser.lastName} Profile`} />
                </div>
                <div className='profile-top-info'>
                    <h1 className='profile-top-fullname'>{profileUser.firstName} {profileUser.lastName}</h1>
                    <h3 className='profile-top-friends'>{friendsArr.length} friends</h3>
                </div>
            </div>
            <div className='profile-top-lower'>
                <div className='profile-posts-section'>
                    <p className='posts-text'>
                        Posts
                    </p>
                </div>
                <div className='profile-friends-section'>
                    <p className='friends-text'>
                        Friends
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProfileTop;
