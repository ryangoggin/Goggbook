import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { updateProfileBio } from "../../store/profile";
import "./EditBioModal.css";

function EditBioModal({ sessionUser }) {
	const dispatch = useDispatch();
    const profileUser = useSelector((state) => state.profile.user);
	const [bio, setBio] = useState(profileUser?.bio);
    const [errors, setErrors] = useState([]);

	const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();

        let errorsObj = {};

        if (bio.length > 150) {
            errorsObj.content = "Bios must be less than 150 characters, please change your bio length and try again.";
        }

        if (Object.values(errorsObj).length > 0) {
            setErrors(Object.values(errorsObj));
            return;
        };

        const editUser = {
            bio: bio
        };

        dispatch(updateProfileBio(editUser))
            .then(() => {
                closeModal();
            })

        setBio(bio);
        setErrors([]);
    };

    if (!profileUser) return null;

	return (
		<>
			<div className="update-bio-form-container">
                <div>
                    <h2 className="update-bio">Edit bio</h2>
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
						value={bio}
						onChange={(e) => setBio(e.target.value)}
						placeholder={`Write a bio about yourself, ${sessionUser.firstName}.`}
					/>
					<button className="post-button-modal" type="submit">Post</button>
				</form>
			</div>
		</>
	);
}

export default EditBioModal;
