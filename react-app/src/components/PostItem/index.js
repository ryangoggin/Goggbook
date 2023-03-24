import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import OpenModalButton from "../OpenModalButton";
import EditPostModal from '../EditPostModal';
import DeletePostModal from '../DeletePostModal';
import './PostItem.css'


function PostItem({ post }) {
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

    const postUser = friendUsers[post.userId];

    if (!postUser) return null;

    return (
        <div className='post-item'>
            <div className='post-upper-half'>
                <div className='post-top'>
                    <div className='post-top-left'>
                        <img className='post-profile-pic' src={`${postUser.profilePic}`} alt={`${postUser.firstName} ${postUser.lastName} Profile`} />
                        <div className='post-author'>
                            <p className='post-fullname'>{postUser.firstName} {postUser.lastName}</p>
                            <p className='post-updated-at'>{post.updatedAt}</p>
                        </div>
                    </div>
                    <div className='post-top-right'>
                        {post.userId === sessionUser.id &&
                            <>

                                <OpenModalButton
                                    className="edit-button"
                                    buttonText='Edit'
                                    onItemClick={closeMenu}
                                    modalComponent={<EditPostModal post={post} />}
                                />
                                <OpenModalButton
                                    className="delete-button"
                                    buttonText='Delete'
                                    onItemClick={closeMenu}
                                    modalComponent={<DeletePostModal post={post} />}
                                />
                            </>
                        }
                    </div>
                </div>
                <div className="post-content">
                    <p>{post.content}</p>
                    {post.postPic &&
                        <img className='post-pic' src={`${post.postPic}`} alt={` Post #${post.id} Pic`}/>
                    }
                </div>
            </div>
            <div className='post-lower-half'>

            </div>
        </div>
    );
};


export default PostItem;
