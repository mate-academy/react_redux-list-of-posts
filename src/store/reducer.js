import {
  START_LOADING,
  HANDLE_SUCCESS,
  HANDLE_ERROR,
  FILTER_LIST,
  DELETE_COMMENT,
  DELETE_POST,
  RESET_LIST,
} from './constants';

const findElemIndex = (list, elemId) => (
  list.findIndex(elem => elem.id === elemId)
);

const delPostFromState = (listOfPosts, postId) => {
  const foundPostIndex = findElemIndex(listOfPosts, postId);
  return [
    ...listOfPosts.slice(0, foundPostIndex),
    ...listOfPosts.slice(foundPostIndex + 1),
  ];
};

const delCommentFromState = (listOfPosts, postId, commentId) => {
  const foundPostIndex = findElemIndex(listOfPosts, postId);
  const foundCommentIndex = findElemIndex(
    listOfPosts[foundPostIndex].comments,
    commentId
  );

  return [
    ...listOfPosts.slice(0, foundPostIndex),

    {
      ...listOfPosts[foundPostIndex],
      comments: [
        ...listOfPosts[foundPostIndex]
          .comments.slice(0, foundCommentIndex),

        ...listOfPosts[foundPostIndex]
          .comments.slice(foundCommentIndex + 1),
      ],
    },

    ...listOfPosts.slice(foundPostIndex + 1),
  ];
};

const reducer = (state, action) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        buttonText: 'loading...',
        isLoading: true,
      };

    case HANDLE_SUCCESS:
      return {
        ...state,
        postListFromServer: action.postsWithComments,
        postList: action.postsWithComments,
        filteredList: action.postsWithComments,
        isLoaded: true,
        isLoading: false,
        isError: false,
      };

    case HANDLE_ERROR:
      return {
        ...state,
        buttonText: 'try again',
        isLoaded: false,
        isLoading: false,
        isError: true,
      };

    case FILTER_LIST:
      return {
        ...state,
        filteredList: action.searchStr
          ? state.postList
            .filter(post => (
              (post.title.indexOf(action.searchStr) >= 0)
            || (post.body.indexOf(action.searchStr) >= 0)
            ))
          : [...state.postList],
      };

    case DELETE_COMMENT:
      return {
        ...state,
        postList: delCommentFromState(
          state.postList, action.postId, action.commentId
        ),
        filteredList: delCommentFromState(
          state.filteredList, action.postId, action.commentId
        ),
      };

    case DELETE_POST:
      return {
        ...state,
        postList: delPostFromState(state.postList, action.postId),
        filteredList: delPostFromState(state.filteredList, action.postId),
      };

    case RESET_LIST:
      return {
        ...state,
        postList: [...state.postListFromServer],
        filteredList: [...state.postListFromServer],
      };

    default: return state;
  }
};

export default reducer;
