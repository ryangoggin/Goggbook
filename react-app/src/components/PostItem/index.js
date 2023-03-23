import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import './PostItem.css';


function PostItem({ post }) {
    // select data from the Redux store
    const sessionUser = useSelector((state) => state.session.user);

    return (
        <div className='post-item'>
            <div className='post-top'>
                <div className='message-left-side'>
                    <img className='post-profile-pic' src={`${sessionUser.profilePic}`} alt={`${sessionUser.firstName} ${sessionUser.lastName} Profile Pic`} />
                </div>
                <div className='post-top-center'>
                    <div className='post-author'>
                        <p className='post-fullname'>{sessionUser.firstName} {sessionUser.lastName}</p>
                        <p className='post-updated-at'>{post.updatedAt}</p>
                    </div>
                </div>
                <div className="post-content">
                    <p>{post.content}</p>
                    {post.postPic &&
                        <img className='post-pic' src={`${post.postPic}`} alt={` Post #${post.id} Pic`}/>
                    }
                </div>
            </div>
            <div className=''>

            </div>
        </div>
    );
};


export default PostItem;
