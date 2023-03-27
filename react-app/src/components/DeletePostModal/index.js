import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { deletePost } from "../../store/post";
import "./DeletePostModal.css";

function DeletePostModal({ post }) {
	const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
	const [content, setContent] = useState(post.content);

	const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch(deletePost(post.id))
            .then(() => {
                closeModal();
            })

        setContent(content);
    };

    const closeDelete = (e) => {
        e.preventDefault();
        return closeModal();
    }

    if (!sessionUser) return null;

	return (
		<>
			<div className="delete-post-form-container">
                <div>
                    <h2 className="delete-post">Delete post</h2>
                </div>
                <div className="user-info">
                    <img className='post-profile-pic' src={`${sessionUser.profilePic}`} alt={`${sessionUser.firstName} ${sessionUser.lastName} Profile`} />
                    <p className='post-fullname'>{sessionUser.firstName} {sessionUser.lastName}</p>
                </div>
                <div className="post-content-container">
                    <p className="post-content-modal">{content}</p>
                </div>
				<form className="post-form" onSubmit={handleSubmit}>
					<button className="delete-post-button-modal" type="submit">Delete</button>
                    <button className="cancel-delete-post-button" onClick={closeDelete}>Cancel</button>
				</form>
			</div>
		</>
	);
}

export default DeletePostModal;
