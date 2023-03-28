import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../store/post";
import "./CommentForm.css";

function CommentForm({ post }) {
	const dispatch = useDispatch();
	const [content, setContent] = useState("");
    const [errors, setErrors] = useState([]);

    const sessionUser = useSelector((state) => state.session.user);

    if (!sessionUser) return null;

    let userId;
    if (sessionUser) userId = sessionUser.id

    const handleSubmit = async (e) => {
        e.preventDefault();

        let errorsObj = {};

        if (content.length === 0 || content.length > 2000) {
            errorsObj.content = "Comments must be between 1 and 2000 characters.";
        }

        if (Object.values(errorsObj).length > 0) {
            setErrors(Object.values(errorsObj));
            return;
        };

        const newComment = {
            content: content,
            user_id: userId,
            post_id: post.id
        }

        dispatch(createComment(post.id, newComment));

        setContent("");
        setErrors([]);
    };

	return (
		<>
            <ul className={errors.length > 0 ? "comment-form-errors" : "hidden"}>
                {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
            </ul>
			<div className="comment-form-container">
                <div className="comment-form-left">
                    <img className='comment-profile-pic' src={`${sessionUser.profilePic}`} alt={`${sessionUser.firstName} ${sessionUser.lastName} Profile`} />
                </div>
                <div className="comment-form-right">
                    <form className="comment-form" onSubmit={handleSubmit} encType="multipart/form-data">
                        <textarea
                            id={`post${post.id}`}
                            className="comment-form-content"
                            type="text"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder={`Write a comment...`}
                            required
                        />
                        <button className="send-comment-button" type="submit">Comment</button>
                    </form>
                </div>
			</div>
		</>
	);
}

export default CommentForm;
