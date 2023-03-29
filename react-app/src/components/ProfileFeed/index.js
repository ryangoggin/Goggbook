import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import PostItem from "../PostItem";
import { getFeed } from "../../store/post"; // NEED TO MAKE getProfileFeed in post reducer!
import { getProfileUser, getProfileFriends } from "../../store/profile";
import OpenModalButton from "../OpenModalButton";
import PostFormModal from "../PostFormModal";
import "./ProfileFeed.css";

function ProfileFeed() {
    // select data from the Redux store
    const sessionUser = useSelector(state => state.session.user);
    const profileUser = useSelector(state => state.profile.user);
    const feedPosts = useSelector(state => state.posts);
    const { userId } = useParams();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const dispatch = useDispatch();

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
        if (!ulRef.current.contains(e.target)) {
            setShowMenu(false);
        }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    useEffect(() => {
        dispatch(getFeed()); // REPLACE WITH getProfileFeed when made
        dispatch(getProfileUser(userId));
        dispatch(getProfileFriends(userId));
    }, [dispatch, userId]);

    if (!profileUser) return null;

    const handleLiveVideo = (e) => {
        e.preventDefault();
        window.alert('Live video Feature Coming Soon...');
    }

    const handleFeelingActivity = (e) => {
        e.preventDefault();
        window.alert('Feeling/activity Feature Coming Soon...');
    }

    const closeMenu = () => setShowMenu(false);

    let feedPostsArr = [];
    let profileFeedPostsArr = [];

    if (!feedPosts) {
        return null;
    } else {
        feedPostsArr = Object.values(feedPosts);
        profileFeedPostsArr = feedPostsArr.filter(post => post.userId === profileUser.id); // won't need to filter after getProfileFeed is made
    }

    // sort feed posts by post date
    profileFeedPostsArr.sort(function(a,b){
        return new Date(b.updatedAt) - new Date(a.updatedAt);
    });

    return (
        <div className='feed-container'>
            <div className="feed-left">
                <div className="profile-info-container">
                    <img className='profile-pic' src={`${profileUser.profilePic}`} alt={`${profileUser.firstName} ${profileUser.lastName} Profile`} />
                    <p className="profile-fullname">{profileUser.firstName} {profileUser.lastName}</p>
                </div>
            </div>
            <div className="feed-center">
                { profileUser.id === sessionUser.id &&
                    <div className="create-post-container">
                        <div className="create-post-top">
                        <img className='post-profile-pic' src={`${profileUser.profilePic}`} alt={`${profileUser.firstName} ${profileUser.lastName} Profile`} />
                            <OpenModalButton
                                className="post-button"
                                buttonText={`What's on your mind, ${profileUser.firstName}?`}
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
                {profileFeedPostsArr.map((post) => {
                    return (
                        <div key={`post${post.id}`} className='post-item-container'>
                            <PostItem post={post} />
                        </div>
                    );
                })}
            </div>
            <div className="feed-right">
                <p>Right placeholder</p>
            </div>
        </div>
    );
}


export default ProfileFeed;
