import React from 'react';
import { useSelector } from 'react-redux';
import './PostItem.css';


function PostItem({ post }) {
    // select data from the Redux store
    const sessionUser = useSelector((state) => state.session.user);
    const friendUsers = useSelector(state => state.friends);

    if (!friendUsers) return null;

    const postUser = friendUsers[post.userId];

    return (
        <div className='post-item'>
            <div className='post-top'>
                <div className='message-left-side'>
                    <img className='post-profile-pic' src={`${postUser.profilePic}`} alt={`${postUser.firstName} ${postUser.lastName} Profile`} />
                </div>
                <div className='post-top-center'>
                    <div className='post-author'>
                        <p className='post-fullname'>{postUser.firstName} {postUser.lastName}</p>
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
