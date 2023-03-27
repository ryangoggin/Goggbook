//types
const LOAD_POSTS = 'posts/LOAD_POSTS';
const ADD_POST = 'posts/ADD_POST';
const EDIT_POST = 'posts/EDIT_POST';
const REMOVE_POST = 'posts/REMOVE_POST';
const ADD_COMMENT = 'posts/ADD_COMMENT';
const EDIT_COMMENT = 'posts/EDIT_COMMENT';
const REMOVE_COMMENT = 'posts/REMOVE_COMMENT';
const ADD_LIKE = 'posts/ADD_LIKE';
const REMOVE_LIKE = 'posts/REMOVE_LIKE'

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

const addComment = comment => ({
    type: ADD_COMMENT,
    comment
});

const editComment = comment => ({
    type: EDIT_COMMENT,
    comment
});

const removeComment = comment => ({
    type: REMOVE_COMMENT,
    comment
});

const addLike = like => ({
    type: ADD_LIKE,
    like
});

const removeLike = like => ({
    type: REMOVE_LIKE,
    like
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

export const createComment = (id, comment) => async (dispatch) => {
  const resComment = await fetch(`api/posts/${id}/comment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comment),
  });

  if (resComment.ok) {
    const comment = await resComment.json();
    dispatch(addComment(comment));
    return comment;
  }
}

export const updateComment = (id, comment) => async (dispatch) => {
  const resComment = await fetch(`/api/comments/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comment),
  });

  if (resComment.ok) {
    const comment = await resComment.json();
    dispatch(editComment(comment));
    return comment;
  }
}

export const deleteComment = (comment) => async (dispatch) => {
  const res = await fetch(`/api/comments/${comment.id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (res.ok) {
    dispatch(removeComment(comment));
    return `Comment #${comment.id} deleted successfully`;
  }
}

export const createLike = (id) => async (dispatch) => {
  const resLike = await fetch(`api/posts/${id}/like`, {
    method: "POST",
    headers: { "Content-Type": "application/json" }
  });

  if (resLike.ok) {
    const like = await resLike.json();
    dispatch(addLike(like));
    return like;
  }
}

export const deleteLike = (like) => async (dispatch) => {
  const res = await fetch(`/api/likes/${like.id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (res.ok) {
    dispatch(removeLike(like));
    return `Like #${like.id} deleted successfully`;
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
      case ADD_COMMENT:
        newState = { ...state };
        newState[action.comment.postId].comments.push(action.comment);
        return newState;
      case EDIT_COMMENT:
        newState = { ...state };
        newState[action.comment.postId].comments.forEach(comment => comment.id === action.comment.id ?
          (Object.assign(comment, action.comment)) : null);
        return newState;
      case REMOVE_COMMENT:
        newState = { ...state };
        let newCommentArr = newState[action.comment.postId].comments.filter(comment => comment.id !== action.comment.id);
        newState[action.comment.postId].comments = newCommentArr;
        return newState;
      case ADD_LIKE:
        newState = { ...state };
        newState[action.like.postId].likes.push(action.like);
        return newState;
      case REMOVE_LIKE:
        newState = { ...state };
        let newLikeArr = newState[action.like.postId].likes.filter(like => like.id !== action.like.id);
        newState[action.like.postId].likes = newLikeArr;
        return newState;
      default:
        return state;
    }
  }

  export default postReducer;
