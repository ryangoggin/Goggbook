import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import PostItem from "../PostItem";
import { getFeed } from "../../store/post";
import { getFriends } from "../../store/friend";
import { getAllUsers } from "../../store/users";
import { clearProfile } from "../../store/profile";
import OpenModalButton from "../OpenModalButton";
import PostFormModal from "../PostFormModal";
import FeedFriendItem from "../FeedFriendItem";
import "./Feed.css";

function Feed() {
    // select data from the Redux store
    const sessionUser = useSelector(state => state.session.user)
    const feedPosts = useSelector(state => state.posts);
    const friends = useSelector(state => state.friends);
    const [showMenu, setShowMenu] = useState(false);
    const history = useHistory();
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
        dispatch(clearProfile());
        dispatch(getAllUsers());
        dispatch(getFeed());
        dispatch(getFriends());
    }, [dispatch]);

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

    function handleLinkedIn() {
        window.open("https://www.linkedin.com/in/ryangoggin20/", "_blank");
    }

    function handleGithub() {
        window.open("https://github.com/ryangoggin", "_blank");
    }

    function handleGoggInn() {
        window.open("https://ryangoggin-gogginn.onrender.com/", "_blank");
    }

    function handlePixelPal() {
        window.open("https://pixelpal.onrender.com/", "_blank");
    }

    const closeMenu = () => setShowMenu(false);

    let friendsArr = [];
    if (!friends) {
        return null;
    } else {
        friendsArr = Object.values(friends);
    }

    let feedPostsArr = [];
    if (!feedPosts) {
        return null;
    } else {
        feedPostsArr = Object.values(feedPosts);
    }

    // sort feed posts by post date
    feedPostsArr.sort(function(a,b){
        return new Date(b.updatedAt) - new Date(a.updatedAt);
    });

    return (
        <div className='feed-container'>
            <div className="feed-left">
                <div className="profile-info-container">
                    <button className="user-profile-button" onClick={handleCurrProfileClick}>
                        <img className='profile-pic' src={`${sessionUser.profilePic}`} alt={`${sessionUser.firstName} ${sessionUser.lastName} Profile`} />
                        <p className="profile-fullname">{sessionUser.firstName} {sessionUser.lastName}</p>
                    </button>
                </div>
                <div className="link-button-container">
                    <button className="user-profile-button" onClick={handleLinkedIn}>
                        <div className="linkedin-container">
                            <i className="fa-brands fa-linkedin"></i>
                        </div>
                        <p className="profile-fullname">Ryan's LinkedIn</p>
                    </button>
                </div>
                <div className="link-button-container">
                    <button className="user-profile-button" onClick={handleGithub}>
                        <div className="github-container">
                            <i className="fa-brands fa-github"></i>
                        </div>
                        <p className="profile-fullname">Ryan's Github</p>
                    </button>
                </div>
                <div className="link-button-container">
                    <button className="user-profile-button" onClick={handleGoggInn}>
                        <div className="gogginn-container">
                            <img className="gogginn-logo" src="https://goggbook-aws.s3.amazonaws.com/mug-hot-solid.png" alt="GoggInn Logo" />
                        </div>
                        <p className="profile-fullname">GoggInn</p>
                    </button>
                </div>
                <div className="link-button-container">
                    <button className="user-profile-button" onClick={handlePixelPal}>
                        <img className="pixel-pal-logo" src="https://goggbook-aws.s3.amazonaws.com/pixel-pal-logo.png" />
                        <p className="profile-fullname">PixelPal</p>
                    </button>
                </div>
            </div>
            <div className="feed-center">
                <div className="create-post-container">
                    <div className="create-post-top">
                    <button className="user-profile-pic-button" onClick={handleCurrProfileClick}>
                        <img className='create-post-profile-pic' src={`${sessionUser.profilePic}`} alt={`${sessionUser.firstName} ${sessionUser.lastName} Profile`} />
                    </button>
                        <OpenModalButton
                            className="post-button"
                            buttonText={`What's on your mind, ${sessionUser.firstName}?`}
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
                {feedPostsArr.map((post) => {
                    return (
                        <div key={`post${post.id}`} className='post-item-container'>
                            <PostItem post={post} />
                        </div>
                    );
                })}
            </div>
            <div className="feed-right">
                <div className="contacts">
                    <h3 className="contacts-text">Contacts</h3>
                </div>
                {friendsArr.map((friend) => {
                    return (
                        <FeedFriendItem friend={friend}/>
                    );
                })}
            </div>
        </div>
    );
}


export default Feed;
