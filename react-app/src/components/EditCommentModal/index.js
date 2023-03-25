import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeed } from "../../store/post";
import { useModal } from "../../context/Modal";
import { updateComment } from "../../store/post";
import "./EditCommentModal.css";

function EditCommentModal({ comment }) {
	const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
	const [content, setContent] = useState(comment.content);

	const { closeModal } = useModal();

    useEffect(() => {
        dispatch(getFeed());
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const editComment = {
            content: content,
            user_id: comment.userId
        };

        dispatch(updateComment(comment.id, editComment))
            .then(() => {
                closeModal();
            })

        setContent(content);
    };

    if (!sessionUser) return null;

	return (
		<>
			<div className="comment-modal-container">
                <div>
                    <h2 className="update-comment">Update comment</h2>
                </div>
                <div className="user-info">
                    <img className='post-profile-pic' src={`${sessionUser.profilePic}`} alt={`${sessionUser.firstName} ${sessionUser.lastName} Profile`} />
                    <p className='post-fullname'>{sessionUser.firstName} {sessionUser.lastName}</p>
                </div>
				<form className="post-form" onSubmit={handleSubmit}>
					<textarea
                        className="post-form-content"
						type="text"
						value={content}
						onChange={(e) => setContent(e.target.value)}
						placeholder={`Write a comment...`}
						required
					/>
					<button className="post-button" type="submit">Comment</button>
				</form>
			</div>
		</>
	);
}

export default EditCommentModal;
