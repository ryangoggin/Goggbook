// types:
const LOAD_ALL_USERS = 'profile/LOAD_ALL_USERS';

// POJO action creators:
const loadAllUsers = users => ({
    type: LOAD_ALL_USERS,
    users
});

// thunk action creators:
export const getAllUsers = () => async dispatch => {
    const response = await fetch(`/api/users/`);

    if (response.ok) {
      const users = await response.json();
      const usersArr = users.users;
      dispatch(loadAllUsers(usersArr));
    }
};

const initialState = {};

const usersReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        case LOAD_ALL_USERS:
            newState = {...state};
            let normalizedUsers = {};
            const usersArr = action.users;
            usersArr.forEach(user => {
            normalizedUsers[user.id] = user;
            });
            newState = normalizedUsers;
            return newState;
        default:
            return state;
  }
};

export default usersReducer;
