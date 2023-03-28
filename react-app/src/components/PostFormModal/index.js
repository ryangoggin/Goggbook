import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { createPost } from "../../store/post";
import "./PostFormModal.css";

function PostFormModal() {
	const dispatch = useDispatch();
	const [content, setContent] = useState("");
    const [postPic, setPostPic] = useState("");
    const [errors, setErrors] = useState([]);

	const { closeModal } = useModal();

    const sessionUser = useSelector((state) => state.session.user);

    if (!sessionUser) return null;

    let userId;
    if (sessionUser) userId = sessionUser.id;

    const handleSubmit = async (e) => {
        e.preventDefault();

        let errorsObj = {};

        if (postPic) {
            let postPicNameArr = postPic.name.split(".");
            let postPicExtension = postPicNameArr[postPicNameArr.length - 1];
            let allowedExtensions = ["png", "jpg", "jpeg", "gif"];

            if (!(allowedExtensions.includes(postPicExtension))) {
                errorsObj.picExtension = "Pictures must be of file type .png, .jpg, .jpeg, or .gif, please change your picture file and try again."
            }
        }

        if (content.length === 0 || content.length > 2000) {
            errorsObj.content = "Posts must be between 1 and 2000 characters, please change your post length and try again.";
        }

        if (Object.values(errorsObj).length > 0) {
            setErrors(Object.values(errorsObj));
            return;
        };

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
        setErrors([]);
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
                    <ul className={errors.length > 0 ? "errors" : "hidden"}>
						{errors.map((error, idx) => (
							<li key={idx}>{error}</li>
						))}
					</ul>
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
                    <div className="add-pic-container">
                        <label className="add-pic-label" htmlFor="add-pic">Add an image to your post:</label>
                        <input
                            className="add-pic"
                            type="file"
                            accept="image/*"
                            onChange={handlePostPic}
                        />
                    </div>
					<button className= "post-button-modal" type="submit">Post</button>
				</form>
			</div>
		</>
	);
}

export default PostFormModal;
