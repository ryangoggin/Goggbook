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

    function birthdayToday(birthdate) {
        const todayMonth = new Date().getMonth();
        const todayDate = new Date().getDate();

        let month = birthdate?.slice(8, 11);
        const day = birthdate?.slice(5, 7);

        if (month === "Jan") {
            month = 0;
        } else if (month === "Feb") {
            month = 1;
        } else if (month === "Mar") {
            month = 2;
        } else if (month === "Apr") {
            month = 3;
        } else if (month === "May") {
            month = 4;
        } else if (month === "Jun") {
            month = 5;
        } else if (month === "Jul") {
            month = 6;
        } else if (month === "Aug") {
            month = 7;
        } else if (month === "Sep") {
            month = 8;
        } else if (month === "Oct") {
            month = 9;
        } else if (month === "Nov") {
            month = 10;
        } else if (month === "Dec") {
            month = 11;
        }

        if (todayDate === +day && todayMonth === month) {
            return true;
        } else {
            return false;
        }
    }

    const friendBrithdaysArr = [];
    for (let friend of friendsArr) {
        let friendBirthday = friend.birthdate;
        if (birthdayToday(friendBirthday)) friendBrithdaysArr.push(friend);
    }

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
                <div className="birthdays">
                    <h3 className="birthdays-text">Birthdays</h3>
                </div>
                <div className="birthday-details">
                    <i class="fa-solid fa-gift"></i>
                    {friendBrithdaysArr.length > 0 ?
                        friendBrithdaysArr.length === 1 ? (
                                <p className="birthday-details-text">
                                    {friendBrithdaysArr[0].firstName} {friendBrithdaysArr[0].lastName} has a birthday today.
                                </p>
                            ):(
                                <p className="birthday-details-text">
                                    {friendBrithdaysArr[0].firstName} {friendBrithdaysArr[0].lastName} and {friendBrithdaysArr.length - 1} others have birthdays today.
                                </p>
                        ):(
                        <p className="birthday-details-text">There are no birthdays today.</p>
                    )}
                </div>
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
