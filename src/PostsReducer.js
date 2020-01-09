const TYPE_SET_POSTS = 'SET_POSTS';
const TYPE_DELETE_POST = 'DELETE_POST';
const TYPE_DELETE_COMMENT = 'DELETE_COMMENT';
const TYPE_FILTER_POSTS = 'FILTER_POSTS';

export const setPosts = value => ({
  type: TYPE_SET_POSTS, value,
});
export const setFilterPosts = value => ({
  type: TYPE_FILTER_POSTS, value,
});
export const deletePost = value => ({
  type: TYPE_DELETE_POST, value,
});
export const deleteComment = (postId, commentId) => ({
  type: TYPE_DELETE_COMMENT, postId, commentId,
});

const postsState = {
  posts: [],
  filteredPosts: [],
};

const postsReducer = (state = postsState, action) => {
  switch (action.type) {
    case TYPE_SET_POSTS:
      return {
        ...state,
        posts: action.value,
      };
    case TYPE_DELETE_POST:
      return {
        ...state,
        filteredPosts: state.filteredPosts
          .filter(post => post.id !== action.value),
        posts: state.posts
          .filter(post => post.id !== action.value),
      };

    case TYPE_DELETE_COMMENT:
      return {
        ...state,
        filteredPosts: state.filteredPosts
          .map(post => (post.id === action.postId
            ? {
              ...post,
              comments: post.comments
                .filter(comment => comment.id !== action.commentId),
            }
            : post)),

        posts: state.posts
          .map(post => (post.id === action.postId
            ? {
              ...post,
              comments: post.comments
                .filter(comment => comment.id !== action.commentId),
            }
            : post)),
      };
    case TYPE_FILTER_POSTS:
      return {
        ...state,
        filteredPosts: action.value,
      };
    default:
      return state;
  }
};

export default postsReducer;
