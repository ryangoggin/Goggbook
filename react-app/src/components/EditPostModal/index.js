import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { updatePost } from "../../store/post";
import "./EditPostModal.css";

function EditPostModal({ post }) {
	const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
	const [content, setContent] = useState(post.content);
    const [errors, setErrors] = useState([]);

	const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();

        let errorsObj = {};

        if (content.length === 0 || content.length > 2000) {
            errorsObj.content = "Posts must be between 1 and 2000 characters, please change your post length and try again.";
        }

        if (Object.values(errorsObj).length > 0) {
            setErrors(Object.values(errorsObj));
            return;
        };

        const editPost = {
            content: content,
            user_id: post.userId
        };

        dispatch(updatePost(post.id, editPost))
            .then(() => {
                closeModal();
            })

        setContent(content);
        setErrors([]);
    };

    if (!sessionUser) return null;

	return (
		<>
			<div className="update-post-form-container">
                <div>
                    <h2 className="update-post">Edit post</h2>
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
						placeholder={`What's on your mind, ${sessionUser.firstName}?`}
						required
					/>
					<button className="post-button-modal" type="submit">Post</button>
				</form>
			</div>
		</>
	);
}

export default EditPostModal;
