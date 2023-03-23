//types
const LOAD_FRIENDS = 'friends/LOAD_FRIENDS';

// POJO action creators:
const loadFriends = friends => ({
    type: LOAD_FRIENDS,
    friends
  });

// thunk action creators:
export const getFriends = () => async (dispatch) => {
    const res = await fetch(`/api/users/friends`);

    if (res.ok) {
        const friends = await res.json();
        dispatch(loadFriends(friends.friends));
        return friends
    }
}

// initial state for reducer:
const initialState = {};

// reducer:
const friendReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
      case LOAD_FRIENDS:
        const friendsArr = Object.values(action.friends);
        friendsArr.forEach(friend => {
          newState[friend.id] = friend;
        });
        return newState;
      default:
        return state;
    }
  }

  export default friendReducer;
