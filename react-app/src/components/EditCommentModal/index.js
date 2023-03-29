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
    const [errors, setErrors] = useState([]);

	const { closeModal } = useModal();

    useEffect(() => {
        dispatch(getFeed());
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let errorsObj = {};

        if (content.length === 0 || content.length > 2000) {
            errorsObj.content = "Comments must be between 1 and 2000 characters, please change your comment length and try again.";
        }

        if (Object.values(errorsObj).length > 0) {
            setErrors(Object.values(errorsObj));
            return;
        };

        const editComment = {
            content: content,
            user_id: comment.userId
        };

        dispatch(updateComment(comment.id, editComment))
            .then(() => {
                closeModal();
            })

        setContent(content);
        setErrors([]);
    };

    if (!sessionUser) return null;

	return (
		<>
			<div className="update-comment-modal-container">
                <div>
                    <h2 className="update-comment">Edit comment</h2>
                    <ul className={errors.length > 0 ? "errors" : "hidden"}>
						{errors.map((error, idx) => (
							<li key={idx}>{error}</li>
						))}
					</ul>
                </div>
                <div className="user-info">
                    <img className='post-modal-profile-pic' src={`${sessionUser.profilePic}`} alt={`${sessionUser.firstName} ${sessionUser.lastName} Profile`} />
                    <p className='post-modal-fullname'>{sessionUser.firstName} {sessionUser.lastName}</p>
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
					<button className="post-button-modal" type="submit">Comment</button>
				</form>
			</div>
		</>
	);
}

export default EditCommentModal;
