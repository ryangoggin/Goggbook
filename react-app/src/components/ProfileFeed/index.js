import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import PostItem from "../PostItem";
import { getProfileFeed } from "../../store/post";
import { getProfileUser, getProfileFriends } from "../../store/profile";
import { getAllUsers } from "../../store/users";
import OpenModalButton from "../OpenModalButton";
import PostFormModal from "../PostFormModal";
import EditBioModal from "../EditBioModal";
import ProfileTop from "../ProfileTop";
import ProfileFriendItem from "../ProfileFriendItem";
import "./ProfileFeed.css";

function ProfileFeed() {
    // select data from the Redux store
    const sessionUser = useSelector(state => state.session.user);
    const profileUser = useSelector(state => state.profile.user);
    const profileFriends = useSelector(state => state.profile.friends);
    const profileFeed = useSelector(state => state.posts);
    const { userId } = useParams();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const dispatch = useDispatch();
    const history = useHistory();

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
        dispatch(getProfileUser(userId));
        dispatch(getProfileFriends(userId));
        dispatch(getProfileFeed(userId));
        // dispatch(getProfilePosts(userId));
    }, [dispatch, userId]);

    if (!profileFriends) return null;

    const handleLiveVideo = (e) => {
        e.preventDefault();
        window.alert('Live video Feature Coming Soon...');
    }

    const handleFeelingActivity = (e) => {
        e.preventDefault();
        window.alert('Feeling/activity Feature Coming Soon...');
    }

    const handleCurrProfileClick = (e) => {
        e.preventDefault();
        history.push(`/users/${sessionUser.id}`);
    };

    const closeMenu = () => setShowMenu(false);

    let profileFeedArr = [];


    if (!profileFeed) {
        return null;
    } else {
        profileFeedArr = Object.values(profileFeed);
    }

    // sort feed posts by post date
    profileFeedArr.sort(function(a,b){
        return new Date(b.updatedAt) - new Date(a.updatedAt);
    });

    function convertBirthday(birthdate) {
        const year = birthdate?.slice(12, 16);
        let month = birthdate?.slice(8, 11);
        const day = birthdate?.slice(5, 7);

        if (month === "Jan") {
            month = "January";
        } else if (month === "Feb") {
            month = "February";
        } else if (month === "Mar") {
            month = "March";
        } else if (month === "Apr") {
            month = "April";
        } else if (month === "Jun") {
            month = "June";
        } else if (month === "Jul") {
            month = "July";
        } else if (month === "Aug") {
            month = "August";
        } else if (month === "Sep") {
            month = "September";
        } else if (month === "Oct") {
            month = "October";
        } else if (month === "Nov") {
            month = "November";
        } else if (month === "Dec") {
            month = "December";
        }

        const convertedBirthday = `${month} ${day}, ${year}`;

        return convertedBirthday
    }

    const profileFriendsArr = Object.values(profileFriends);
    const firstSixFriends = profileFriendsArr?.slice(0, 6);


    return (
        <div className='profile-feed-container'>
            <div className="profile-feed-left-bar">
                <div className="profile-info-container">
                    <img className='profile-pic' src={`${profileUser?.profilePic}`} alt={`${profileUser?.firstName} ${profileUser?.lastName} Profile`} />
                    <p className="profile-fullname">{profileUser?.firstName} {profileUser?.lastName}</p>
                </div>
            </div>
            <div className="profile-feed-center">
                <ProfileTop profileUser={profileUser} profileFriends={profileFriends} />
                <div className="profile-feed-bottom">
                    <div className="profile-feed-bottom-left">
                        <div className="profile-about">
                            <h3 className="intro">Intro</h3>
                            {(profileUser?.bio === "" && profileUser?.id === sessionUser.id) &&
                                <OpenModalButton
                                className="add-bio-button"
                                buttonText="Add bio"
                                onItemClick={closeMenu}
                                modalComponent={<EditBioModal sessionUser={sessionUser} />}
                                />
                            }
                            {profileUser?.bio !== "" &&
                                <div className="bio-container">
                                    <p className="bio">
                                        {profileUser?.bio}
                                    </p>
                                    {profileUser?.id === sessionUser.id &&
                                        <OpenModalButton
                                        className="edit-button"
                                        buttonText={<i className="fa-solid fa-pencil"></i>}
                                        onItemClick={closeMenu}
                                        modalComponent={<EditBioModal sessionUser={sessionUser} />}
                                        />
                                    }
                                </div>
                            }
                            <div className="birthday-container">
                                <i className="fa-solid fa-cake-candles"></i>
                                <p className="birthday">
                                    {convertBirthday(profileUser?.birthdate)}
                                </p>
                            </div>
                        </div>
                        <div className="profile-friends">
                            <h3 className="friends">Friends</h3>
                            <div className="friends-container">
                                {firstSixFriends.map((friend) => {
                                    return (
                                        <div key={`friend${friend.id}`}>
                                            <ProfileFriendItem friend={friend}/>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="profile-feed-bottom-right">
                        { profileUser?.id === sessionUser.id &&
                            <div className="create-post-container">
                                <div className="create-post-top">
                                    <button className="user-profile-pic-button" onClick={handleCurrProfileClick}>
                                        <img className='create-post-profile-pic' src={`${profileUser?.profilePic}`} alt={`${profileUser?.firstName} ${profileUser?.lastName} Profile`} />
                                    </button>
                                    <OpenModalButton
                                        className="post-button"
                                        buttonText={`What's on your mind, ${profileUser?.firstName}?`}
                                        onItemClick={closeMenu}
                                        modalComponent={<PostFormModal />}
                                    />
                                </div>
                                <div className="create-post-bottom">
                                    <button className="video-button" onClick={handleLiveVideo}>{<>
                                        <i className="fa-solid fa-video"></i>
                                        <p className="video-text">Live video</p>
                                        </>}
                                    </button>
                                    <OpenModalButton
                                        className="photo-button"
                                        buttonText={<>
                                            <i className="fa-regular fa-image"></i>
                                            <p className="photo-text">Photo</p>
                                        </>}
                                        onItemClick={closeMenu}
                                        modalComponent={<PostFormModal />}
                                    />
                                    <button className="feeling-button" onClick={handleFeelingActivity}>{<>
                                        <i className="fa-regular fa-face-laugh"></i>
                                        <p className="feeling-text">Feeling/activity</p>
                                        </>}
                                    </button>
                                </div>
                            </div>
                        }
                        {profileFeedArr.map((post) => {
                            return (
                                <div key={`profile-post${post.id}`} className='post-item-container'>
                                    <PostItem post={post} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}


export default ProfileFeed;
