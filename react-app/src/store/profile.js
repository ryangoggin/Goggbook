// types:
const LOAD_PROFILE_USER = 'profile/LOAD_PROFILE_USER';
const LOAD_PROFILE_FRIENDS = 'profile/LOAD_PROFILE_FRIENDS';
const CLEAR_PROFILE = 'profile/CLEAR_PROFILE';
const EDIT_PROFILE_USER = 'profile/EDIT_PROFILE';


// POJO action creators:
const loadProfileUser = user => ({
    type: LOAD_PROFILE_USER,
    user
});

const loadProfileFriends = friends => ({
    type: LOAD_PROFILE_FRIENDS,
    friends
});

export const clearProfile = () => ({
    type: CLEAR_PROFILE
});

const editProfileUser = user => ({
    type: EDIT_PROFILE_USER,
    user
});


// thunk action creators:
export const getProfileUser = (id) => async dispatch => {
    const response = await fetch(`/api/users/${id}`);

    if (response.ok) {
      const profileUser = await response.json();
      dispatch(loadProfileUser(profileUser));
    }
};

export const getProfileFriends = (id) => async dispatch => {
  const res = await fetch(`/api/users/${id}/friends`);

  if (res.ok) {
    const friends = await res.json();
    const friendsArr = friends.friends;
    dispatch(loadProfileFriends(friendsArr));
    return friendsArr;
  }
};

export const updateProfileBio = (user) => async (dispatch) => {
    const res = await fetch(`/api/users/bio`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (res.ok) {
      const updatedUser = await res.json();
      dispatch(editProfileUser(updatedUser));
      return updatedUser;
    }
};

export const updateProfilePic = (user) => async (dispatch) => {
  const res = await fetch(`/api/users/pfp`, {
    method: "PUT",
    body: user,
  });

  if (res.ok) {
    const updatedUser = await res.json();
    dispatch(editProfileUser(updatedUser));
    return updatedUser;
  }
};

const initialState = { user: null, friends: null };

const profileReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        case LOAD_PROFILE_USER:
            newState = {...state};
            newState.user = action.user;
            return newState;
        case LOAD_PROFILE_FRIENDS:
            newState = {...state};
            let normalizedFriends = {};
            const friendsArr = action.friends;
            friendsArr.forEach(friend => {
            normalizedFriends[friend.id] = friend;
            });
            newState.friends = normalizedFriends;
            return newState;
        case CLEAR_PROFILE:
            newState = { user: null, friends: null };
            return newState;
        case EDIT_PROFILE_USER:
            newState = {...state};
            newState.user = action.user;
            return newState;
        default:
            return state;
  }
};

export default profileReducer;
