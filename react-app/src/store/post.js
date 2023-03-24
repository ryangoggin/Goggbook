//types
const LOAD_POSTS = 'posts/LOAD_POSTS';
const ADD_POST = 'posts/ADD_POST';
const EDIT_POST = 'posts/EDIT_POST';
const REMOVE_POST = 'posts/REMOVE_POST';

// POJO action creators:
const loadPosts = posts => ({
    type: LOAD_POSTS,
    posts
});

const addPost = post => ({
    type: ADD_POST,
    post
});

const editPost = post => ({
  type: EDIT_POST,
  post
});

const removePost = id => ({
  type: REMOVE_POST,
  id
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

// only content editing allowed, need headers back on fetch
export const updatePost = (id, post) => async (dispatch) => {
  const resPost = await fetch(`/api/posts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });

  if (resPost.ok) {
    const post = await resPost.json();
    dispatch(editPost(post));
    return post;
  }
}

export const deletePost = (id) => async (dispatch) => {
  const res = await fetch(`/api/posts/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (res.ok) {
    dispatch(removePost(id));
    return `Post #${id} deleted successfully`;
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
      case EDIT_POST:
        newState = { ...state };
        newState[action.post.id] = action.post;
        return newState;
      case REMOVE_POST:
        newState = { ...state };
        delete newState[action.id];
        return newState;
      default:
        return state;
    }
  }

  export default postReducer;
