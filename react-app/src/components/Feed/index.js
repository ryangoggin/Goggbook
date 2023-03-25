import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostItem from "../PostItem";
import { getFeed } from "../../store/post";
import { getFriends } from "../../store/friend";
import OpenModalButton from "../OpenModalButton";
import PostFormModal from "../PostFormModal";
import "./Feed.css";

function Feed() {
    // select data from the Redux store
    const sessionUser = useSelector(state => state.session.user)
    const feedPosts = useSelector(state => state.posts);
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

    const closeMenu = () => setShowMenu(false);

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
                    <img className='profile-pic' src={`${sessionUser.profilePic}`} alt={`${sessionUser.firstName} ${sessionUser.lastName} Profile`} />
                    <p className="profile-fullname">{sessionUser.firstName} {sessionUser.lastName}</p>
                </div>
            </div>
            <div className="feed-center">
                <div className="create-post-container">
                    <div className="create-post-top">
                    <img className='post-profile-pic' src={`${sessionUser.profilePic}`} alt={`${sessionUser.firstName} ${sessionUser.lastName} Profile`} />
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
                <p>Right placeholder</p>
            </div>
        </div>
    );
}


export default Feed;
