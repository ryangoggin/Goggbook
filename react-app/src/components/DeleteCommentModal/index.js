import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteComment } from "../../store/post";
import "./DeleteCommentModal.css";

function DeleteCommentModal({ comment }) {
	const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
	const [content, setContent] = useState(comment.content);

	const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch(deleteComment(comment))
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
			<div className="comment-modal-container">
                <div>
                    <h2 className="delete-comment">Delete comment</h2>
                </div>
                <div className="user-info">
                    <img className='post-profile-pic' src={`${sessionUser.profilePic}`} alt={`${sessionUser.firstName} ${sessionUser.lastName} Profile`} />
                    <p className='post-fullname'>{sessionUser.firstName} {sessionUser.lastName}</p>
                </div>
                <div className="post-content-container">
                    <p className="post-content">{content}</p>
                </div>
				<form className="post-form" onSubmit={handleSubmit}>
					<button className="delete-button" type="submit">Delete</button>
                    <button className="cancel-delete-button" onClick={closeDelete}>Cancel</button>
				</form>
			</div>
		</>
	);
}

export default DeleteCommentModal;
