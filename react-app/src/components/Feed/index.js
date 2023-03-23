import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostItem from "../PostItem";
import { getFeed } from "../../store/post";
import "./Feed.css";

function Feed() {
    // select data from the Redux store
    const sessionUser = useSelector(state => state.session.user)
    const feedPosts = useSelector(state => state.posts);

    const dispatch = useDispatch();

    //populate store with channelMessages on render and when channel.id changes
    //trying to remove allMessages from dependency array (ADD BACK IN IF NEEDED)
    useEffect(() => {
        dispatch(getFeed());
    }, [dispatch]);

    const handleLiveVideo = (e) => {
        e.preventDefault();
        window.alert('Live Video Feature Coming Soon...');
    }

    const handleFeelingActivity = (e) => {
        e.preventDefault();
        window.alert('Live Video Feature Coming Soon...');
    }

    let feedPostsArr = [];
    // memoize the array of feed posts to prevent unnecessary re-renders
    // const feedPostsArr = useMemo(() => {
        if (!feedPosts) {
            return null;
        } else {
            feedPostsArr = Object.values(feedPosts);
        }

    //     return [];
    // }, [feedPosts]);

    return (
        <div className='feed-container'>
            <div className="feed-left">

            </div>
            <div className="feed-center">
                <div className="create-post-container">
                    <div className="create-post-top">
                        <button>What's on your mind, {sessionUser.firstName}?</button>
                    </div>
                    <div className="create-post-bottom">
                        <button onClick={handleLiveVideo}>Live video</button>
                        <button>Photo/video</button>
                        <button onClick={handleFeelingActivity}>Feeling/activity</button>
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

            </div>
        </div>
    );
}


export default Feed;
