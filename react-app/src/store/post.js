//types
const LOAD_POSTS = 'messages/LOAD_POSTS';

// POJO action creators:
const loadPosts = posts => ({
    type: LOAD_POSTS,
    posts
  });

// thunk action creators:
export const getFeed = () => async (dispatch) => {
    const res = await fetch(`/api/posts/feed`);

    if (res.ok) {
        const posts = await res.json();
        dispatch(loadPosts(posts.posts));
        return posts
    }
}

// initial state for reducer:
const initialState = {};

// reducer:
const postReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
      case LOAD_POSTS:
        const postsArr = Object.values(action.posts);
        postsArr.forEach(post => {
          newState[post.id] = post;
        });
        return newState;
      default:
        return state;
    }
  }

  export default postReducer;
