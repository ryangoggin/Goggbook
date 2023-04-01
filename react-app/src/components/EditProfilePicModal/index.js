import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { updateProfilePic } from "../../store/profile";
import { getAllUsers } from "../../store/users";
import { setUser } from "../../store/session";
import "./EditProfilePicModal.css";

function EditProfilePicModal({ sessionUser }) {
	const dispatch = useDispatch();
    const [profilePic, setProfilePic] = useState("");
    const [errors, setErrors] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const profileUser = useSelector((state) => state.profile.user);

	const { closeModal } = useModal();

    useEffect(() => {
        dispatch(setUser(profileUser));
        dispatch(getAllUsers());
    }, [dispatch, profileUser]);

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!selectedFile) {
            setPreview(null)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const handleSubmit = async (e) => {
        e.preventDefault();

        let errorsObj = {};

        if (profilePic) {
            let profilePicNameArr = profilePic.name.split(".");
            let profilePicExtension = profilePicNameArr[profilePicNameArr.length - 1];
            let allowedExtensions = ["png", "jpg", "jpeg", "gif"];

            if (!(allowedExtensions.includes(profilePicExtension))) {
                errorsObj.picExtension = "Pictures must be of file type .png, .jpg, .jpeg, or .gif, please change your picture file and try again.";
            }
        } else {
            errorsObj.picRequired = "You must select a file of type .png, .jpg, .jpeg, or .gif, please select a picture file and try again.";
        }

        if (Object.values(errorsObj).length > 0) {
            setErrors(Object.values(errorsObj));
            return;
        };

        const formData = new FormData();

        formData.append("profile_pic", profilePic);

        dispatch(updateProfilePic(formData))
            .then(() => {
                closeModal();
            })

        setProfilePic("");
        setPreview(null);
        setErrors([]);
    };

    const handleProfilePic = (e) => {
        const imageFile = e.target.files[0];
        setProfilePic(imageFile);

        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0])
    }

    if (!profileUser) return null;

	return (
		<>
			<div className="profile-pic-form-container">
                <div>
                    <h2 className="update-pfp">Update profile picture</h2>
                    <ul className={errors.length > 0 ? "errors" : "hidden"}>
						{errors.map((error, idx) => (
							<li key={idx}>{error}</li>
						))}
					</ul>
                </div>
                <div className="user-info">
                    <img className='post-modal-profile-pic' src={`${profileUser.profilePic}`} alt={`${sessionUser.firstName} ${sessionUser.lastName} Profile`} />
                    <p className='post-modal-fullname'>{sessionUser.firstName} {sessionUser.lastName}</p>
                </div>
				<form className="post-form" onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="add-pic-container">
                        <label className="add-pic-label" htmlFor="add-pic">Select a profile picture to replace your current profile picture:</label>
                        <input
                            className="add-pic"
                            type="file"
                            accept="image/*"
                            onChange={handleProfilePic}
                        />
                    </div>
                    {selectedFile &&
                        (<img className="pfp-preview" src={preview} alt="pfp preview"/>)
                    }
					<button className= "post-button-modal" type="submit">Post</button>
				</form>
			</div>
		</>
	);
}

export default EditProfilePicModal;
