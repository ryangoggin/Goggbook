import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../store/post";
import "./CommentForm.css";

function CommentForm({ post }) {
	const dispatch = useDispatch();
	const [content, setContent] = useState("");

    const sessionUser = useSelector((state) => state.session.user);

    if (!sessionUser) return null;

    let userId;
    if (sessionUser) userId = sessionUser.id

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newComment = {
            content: content,
            user_id: userId,
            post_id: post.id
        }

        dispatch(createComment(post.id, newComment));

        setContent("");
    };

	return (
		<>
			<div className="comment-form-container">
                <div className="comment-form-left">
                    <img className='comment-profile-pic' src={`${sessionUser.profilePic}`} alt={`${sessionUser.firstName} ${sessionUser.lastName} Profile`} />
                </div>
                <div className="comment-form-right">
                    <form className="comment-form" onSubmit={handleSubmit} encType="multipart/form-data">
                        <textarea
                            className="comment-form-content"
                            type="text"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder={`Write a comment...`}
                            required
                        />
                        <button className={(content.length === 0 || content.length > 2000) ? "send-comment-button-disabled" : "send-comment-button"} type="submit" disabled={content.length === 0 || content.length > 2000}>Comment</button>
                    </form>
                </div>
			</div>
		</>
	);
}

export default CommentForm;
