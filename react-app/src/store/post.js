//types
const LOAD_POSTS = 'messages/LOAD_POSTS';
const ADD_POST = 'messages/ADD_POST';

// POJO action creators:
const loadPosts = posts => ({
    type: LOAD_POSTS,
    posts
});

const addPost = post => ({
    type: ADD_POST,
    post
})


// thunk action creators:
export const getFeed = () => async (dispatch) => {
    const res = await fetch(`/api/posts/feed`);

    if (res.ok) {
        const posts = await res.json();
        dispatch(loadPosts(posts.posts));
        return posts
    }
}

export const createPost = (post) => async (dispatch) => {
    const resPost = await fetch(`/api/posts`, {
      method: "POST",
      body: post,
    });

    if (resPost.ok) {
      const post = await resPost.json();
      dispatch(addPost(post));
      return post;
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
      case ADD_POST:
        newState = { ...state };
        newState[action.post.id] = action.post;
        return newState;
      default:
        return state;
    }
  }

  export default postReducer;
