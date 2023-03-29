import React from 'react';
import { useSelector } from 'react-redux';
import ProfileFeed from '../ProfileFeed';
import "./ProfilePage.css";
import Navigation from '../Navigation';

const ProfilePage = () => {
    const user = useSelector(state => state.session.user)

    if (!user) return null;

    return (
        <>
            <Navigation />
            <ProfileFeed />
        </>
    )
}

export default ProfilePage;
