import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import OpenModalButton from "../OpenModalButton";
import EditPostModal from '../EditPostModal';
import DeletePostModal from '../DeletePostModal';
import CommentItem from '../CommentItem';
import CommentForm from '../CommentForm';
import { createLike, deleteLike } from '../../store/post';
import './PostItem.css'


function PostItem({ post }) {
    const dispatch = useDispatch();
    const history = useHistory();
    // select data from the Redux store
    const sessionUser = useSelector((state) => state.session.user);
    const friendUsers = useSelector(state => state.friends);
    const [liked, setLiked] = useState(false);
    const commentsArr = post.comments;
    const likesArr = post.likes;
    //use userId to normalize the likes array for easier searching
    let likesObj = {};
    likesObj = {};
    for (const like of likesArr) {
        likesObj[like.userId] = like;
    }

    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

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

    const closeMenu = () => setShowMenu(false);

    // change liked state variable depending on seed data
    useEffect(() => {
        if (likesObj) {
            if (sessionUser.id in likesObj) {
                setLiked(true);
            } else {
                setLiked(false);
            }
        }
    }, [likesObj, sessionUser.id])

    if (!sessionUser) return null;
    if (!friendUsers) return null;

    const postUser = friendUsers[post.userId];

    if (!postUser) return null;

    // sort comments by post date
    commentsArr.sort(function(a,b){
        return new Date(b.updatedAt) - new Date(a.updatedAt);
    });

    // helper to make updateAt a time since last updated
    function convertUpdatedAt(updatedAt) {
        const updatedAtDate = new Date(updatedAt);
        const now = new Date();
        const timeDiffMs = now.getTime() - updatedAtDate.getTime();

        // Convert time difference from milliseconds to minutes, hours, days, and years
        const timeDiffMin = Math.floor(timeDiffMs / 60000);
        const timeDiffHr = Math.floor(timeDiffMin / 60);
        const timeDiffDay = Math.floor(timeDiffHr / 24);
        const timeDiffYr = Math.floor(timeDiffDay / 365);

        // Return formatted time string
        if (timeDiffYr > 0) {
            return `${timeDiffYr}y`;
        } else if (timeDiffDay > 0) {
            return `${timeDiffDay}d`;
        } else if (timeDiffHr > 0) {
            return `${timeDiffHr}h`;
        } else {
            if (timeDiffMin < 0) {
                return '0m'; // occasionally calculates as -1m, so set to 0m in those cases
            } else {
                return `${timeDiffMin}m`;
            }
        }
    }

    // creates a new like for the post from current user if post isn't already liked, deletes the like from current user if it does exist
    const handleLike = async (e) => {
        e.preventDefault();

        let userLike = likesObj[sessionUser.id]; //get the userLike from likesObj

        // create the like if there isn't a userLike, delete the like if there is a userLike
        if (!userLike) {
            dispatch(createLike(post.id));
            setLiked(true);
        } else {
            dispatch(deleteLike(userLike));
            setLiked(false);
        }
    }

    // moves cursor into the comment input
    const handleComment = async (e) => {
        e.preventDefault();

        const commentFormContent = document.querySelector(`#post${post.id}`);
        commentFormContent.select();
    }

    const handleProfileClick = (e) => {
        e.preventDefault();
        history.push(`/${post.userId}`);
    };

    return (
        <div className='post-item'>
            <div className='post-upper-half'>
                <div className='post-top'>
                    <div className='post-top-left'>
                        <button className='user-profile-pic-button' onClick={handleProfileClick}>
                            <img className='post-profile-pic' src={`${postUser.profilePic}`} alt={`${postUser.firstName} ${postUser.lastName} Profile`} />
                        </button>
                        <div className='post-author'>
                            <button className='post-fullname-button' onClick={handleProfileClick}>
                                <p className='post-fullname'>{postUser.firstName} {postUser.lastName}</p>
                            </button>
                            <p className='post-updated-at'>{convertUpdatedAt(post.updatedAt)}</p>
                        </div>
                    </div>
                    <div className='post-top-right'>
                        {post.userId === sessionUser.id &&
                            <>
                                <OpenModalButton
                                    className="edit-button"
                                    buttonText={<i className="fa-solid fa-pencil"></i>}
                                    onItemClick={closeMenu}
                                    modalComponent={<EditPostModal post={post} />}
                                />
                                <OpenModalButton
                                    className="delete-button"
                                    buttonText={<i className="fa-regular fa-trash-can"></i>}
                                    onItemClick={closeMenu}
                                    modalComponent={<DeletePostModal post={post} />}
                                />
                            </>
                        }
                    </div>
                </div>
                <div className="post-content-container">
                    <p className='post-content'>{post.content}</p>
                    {post.postPic &&
                        <img className='post-pic' src={`${post.postPic}`} alt={` Post #${post.id} Pic`}/>
                    }
                </div>
            </div>
            <div className='post-lower-half'>
                <div className='like-and-comment-counter-container'>
                    <div className='like-counter'>
                        <i className="fa-regular fa-thumbs-up count"></i>
                        <p className='like-count'>{likesArr.length}</p>
                    </div>
                    <div className='comment-counter'>
                        <p className='comment-count'>{commentsArr.length}</p>
                        <i className="fa-regular fa-comment count"></i>
                    </div>
                </div>
                <div className='like-and-comment-button-container'>
                    <button className='like-button' onClick={handleLike}>
                        <i className={liked ? "fa-solid fa-thumbs-up button" : "fa-regular fa-thumbs-up button"}></i>
                        <p className={liked ? 'liked-like-text' : 'like-text'}>Like</p>
                    </button>
                    <button className='comment-button' onClick={handleComment}>
                        <i className="fa-regular fa-comment button"></i>
                        <p className='comment-text'>Comment</p>
                    </button>
                </div>
                <div className='comments-container'>
                    <CommentForm post={post}/>
                    {commentsArr.map((comment) => {
                        return (
                            <div key={`comment${comment.id}`} className='comment-item-container'>
                                <CommentItem comment={comment} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};


export default PostItem;
