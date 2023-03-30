import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current?.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleProfileClick = (e) => {
    e.preventDefault();
    history.push(`/users/${user.id}`);
    closeMenu();
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push(`/`);
    closeMenu();
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button className="profile-button" onClick={openMenu}>
        <img className="user-profile-pic" src={user.profilePic} alt={`${user.firstName} ${user.lastName} Profile`}/>
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li className="dropdown-user-info">
              <button className="user-profile-button" onClick={handleProfileClick}>
                <img className="small-user-profile-pic" src={user.profilePic} alt={`${user.firstName} ${user.lastName} Profile`}/>
                {user.firstName} {user.lastName}
              </button>
            </li>
            <li>

            </li>
            <li className="logout-container">
              <button className="logout-button" onClick={handleLogout}><i className="fa-solid fa-right-from-bracket"></i>Log Out</button>
            </li>
          </>
        ) : (
          <>
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
