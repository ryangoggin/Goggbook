// types:
const LOAD_PROFILE_USER = 'profile/LOAD_PROFILE_USER';
const LOAD_PROFILE_FRIENDS = 'profile/LOAD_PROFILE_FRIENDS';
const LOAD_PROFILE_POSTS = 'profile/LOAD_PROFILE_POSTS';
const CLEAR_PROFILE = 'profile/CLEAR_PROFILE';


// POJO action creators:
const loadProfileUser = user => ({
    type: LOAD_PROFILE_USER,
    user
});

const loadProfileFriends = friends => ({
    type: LOAD_PROFILE_FRIENDS,
    friends
});

const loadProfilePosts = posts => ({
    type: LOAD_PROFILE_POSTS,
    posts
});

export const clearProfile = () => ({
    type: CLEAR_PROFILE
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

export const getProfilePosts = (id) => async dispatch => {
    const res = await fetch(`/api/users/${id}/feed`);

    if (res.ok) {
      const posts = await res.json();
      const postsArr = posts.posts;
      dispatch(loadProfilePosts(postsArr));
      return postsArr;
    }
  };

const initialState = { user: null, friends: null, posts: null };

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
        case LOAD_PROFILE_POSTS:
            newState = {...state};
            let normalizedPosts = {};
            const postsArr = action.posts;
            postsArr.forEach(post => {
            normalizedPosts[post.id] = post;
            });
            newState.posts = normalizedPosts;
            return newState;
        case CLEAR_PROFILE:
            newState = { user: null, friends: null, posts: null };
            return newState;
        default:
            return state;
  }
};

export default profileReducer;
