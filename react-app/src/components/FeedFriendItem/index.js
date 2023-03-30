import React from "react";
import { useHistory } from "react-router-dom";
import "./FeedFriendItem.css";

function FeedFriendItem({ friend }) {
    const history = useHistory();

    const handleFriendProfileClick = (e) => {
        e.preventDefault();
        history.push(`/users/${friend.id}`);
    };

    return (
        <div key={`friend${friend.id}`} className='feed-right-friend-container'>
            <button className="feed-right-friend-profile-button" onClick={handleFriendProfileClick}>
                <img className='feed-right-friend-profile-pic' src={`${friend.profilePic}`} alt={`${friend.firstName} ${friend.lastName} Profile`} />
                <p className="feed-right-friend-profile-fullname">{friend.firstName} {friend.lastName}</p>
            </button>
        </div>
    );
}

export default FeedFriendItem;
