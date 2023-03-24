import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { createPost } from "../../store/post";
import "./PostFormModal.css";

function PostFormModal() {
	const dispatch = useDispatch();
	const [content, setContent] = useState("");
    const [postPic, setPostPic] = useState("");

	const { closeModal } = useModal();

    const sessionUser = useSelector((state) => state.session.user);

    if (!sessionUser) return null;

    let userId;
    if (sessionUser) userId = sessionUser.id

    const handleSubmit = async (e) => {
        e.preventDefault();


        const formData = new FormData();
        formData.append("content", content);
        formData.append('user_id', userId);
        formData.append("post_pic", postPic);

        dispatch(createPost(formData))
            .then(() => {
                closeModal();
            })

        setContent("");
        setPostPic("");
    };

    const handlePostPic = (e) => {
        const imageFile = e.target.files[0];
        setPostPic(imageFile);
    }

	return (
		<>
			<div className="post-form-container">
                <div>
                    <h2 className="create-post">Create post</h2>
                </div>
                <div className="user-info">
                    <img className='post-profile-pic' src={`${sessionUser.profilePic}`} alt={`${sessionUser.firstName} ${sessionUser.lastName} Profile`} />
                    <p className='post-fullname'>{sessionUser.firstName} {sessionUser.lastName}</p>
                </div>
				<form className="post-form" onSubmit={handleSubmit} encType="multipart/form-data">
					<textarea
                        className="post-form-content"
						type="text"
						value={content}
						onChange={(e) => setContent(e.target.value)}
						placeholder={`What's on your mind, ${sessionUser.firstName}?`}
						required
					/>
                    <label htmlFor="add-pic">Add an image to your post</label>
                    <input
                        className="add-pic"
                        type="file"
                        accept="image/*"
                        onChange={handlePostPic}
                    />
					<button className="post-button" type="submit">Post</button>
				</form>
			</div>
		</>
	);
}

export default PostFormModal;
