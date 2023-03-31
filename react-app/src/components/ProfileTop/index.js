import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import OpenModalButton from "../OpenModalButton";
import EditProfilePicModal from '../EditProfilePicModal';
import { getAllUsers } from "../../store/users";
import './ProfileTop.css'


function ProfileTop({ profileUser, profileFriends }) {
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
        if (!ulRef.current?.contains(e.target)) {
            setShowMenu(false);
        }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    let friendsArr = [];
    if (profileFriends) friendsArr = Object.values(profileFriends);

    if (!sessionUser) return null;

    const closeMenu = () => setShowMenu(false);

    const handleFriends = (e) => {
        e.preventDefault();
        window.alert('Friends section not available yet...');
    }

    return (
        <div className='profile-top-container'>
            <div className='profile-top-upper'>
                <div className='big-profile-pic-container'>
                    <img className='big-profile-pic' src={`${profileUser?.profilePic}`} alt={`${profileUser?.firstName} ${profileUser?.lastName} Profile`} />
                    {profileUser?.id === sessionUser.id &&
                        <OpenModalButton
                        className="edit-pfp-button"
                        buttonText={<i className="fa-solid fa-camera"></i>}
                        onItemClick={closeMenu}
                        modalComponent={<EditProfilePicModal sessionUser={sessionUser} />}
                        />
                    }
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
