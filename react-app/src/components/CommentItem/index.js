import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import OpenModalButton from "../OpenModalButton";
import EditCommentModal from '../EditCommentModal';
import DeleteCommentModal from '../DeleteCommentModal';
import './CommentItem.css'


function CommentItem({ comment }) {
    // select data from the Redux store
    const sessionUser = useSelector((state) => state.session.user);
    const friendUsers = useSelector(state => state.friends);

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

    if (!sessionUser) return null;
    if (!friendUsers) return null;

    const commentUser = friendUsers[comment.userId];

    if (!commentUser) return null;

    // helper to make updateAt a time since
    function convertUpdatedAt(updatedAt) {
        const updatedAtDate = new Date(updatedAt);
        const now = new Date();
        const timeDiffMs = now.getTime() - updatedAtDate.getTime();

        // Convert time difference from milliseconds to minutes, hours, days, and years
        const timeDiffMin = Math.floor(timeDiffMs / 60000);
        const timeDiffHr = Math.floor(timeDiffMin / 60);
        const timeDiffDay = Math.floor(timeDiffHr / 24);
        const timeDiffYr = Math.floor(timeDiffHr / 365);

        // Return formatted time string
        if (timeDiffYr > 0) {
            return `${timeDiffYr}y`;
        } else if (timeDiffDay > 0) {
            return `${timeDiffDay}d`;
        } else if (timeDiffHr > 0) {
            return `${timeDiffHr}h`;
        } else {
            return `${timeDiffMin}m`;
        }
    }

    return (
        <div className='comment-item'>
            <div className='comment-left'>
                <img className='comment-profile-pic' src={`${commentUser.profilePic}`} alt={`${commentUser.firstName} ${commentUser.lastName} Profile`} />
                <div className='comment-details'>
                    <div className="comment-content-container">
                        <p className='comment-fullname'>{commentUser.firstName} {commentUser.lastName}</p>
                        <p className='comment-content'>{comment.content}</p>
                    </div>
                    <p className='comment-updated-at'>{convertUpdatedAt(comment.updatedAt)}</p>
                </div>
            </div>
            <div className='comment-right'>
                {comment.userId === sessionUser.id &&
                    <>
                        <OpenModalButton
                            className="edit-button"
                            buttonText={<i className="fa-solid fa-pencil"></i>}
                            onItemClick={closeMenu}
                            modalComponent={<EditCommentModal comment={comment} />}
                        />
                        <OpenModalButton
                            className="delete-button"
                            buttonText={<i className="fa-regular fa-trash-can"></i>}
                            onItemClick={closeMenu}
                            modalComponent={<DeleteCommentModal comment={comment} />}
                        />
                    </>
                }
            </div>

        </div>
    );
};


export default CommentItem;
