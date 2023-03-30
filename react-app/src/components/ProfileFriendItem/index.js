import React from "react";
import { useHistory } from "react-router-dom";
import "./ProfileFriendItem.css";

function ProfileFriendItem({ friend }) {
    const history = useHistory();

    const handleFriendProfileClick = (e) => {
        e.preventDefault();
        history.push(`/${friend.id}`);
    };

    return (
        <button className="friend-button" onClick={handleFriendProfileClick}>
            <div key={`friend${friend.id}`} className="friend-container">
                <img className="friend-profile-pic" src={friend.profilePic} alt={`${friend.firstName} ${friend.lastName} Profile`} />
                <p className="friend-fullname">{friend.firstName} {friend.lastName}</p>
            </div>
        </button>
    );
}

export default ProfileFriendItem;
