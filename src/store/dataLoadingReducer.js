import { getPostsFromServer } from '../api/getPostsFromServer';
import { getUsersFromServer } from '../api/getUsersFromServer';
import { getCommentsFromServer } from '../api/getCommentsFromServer';

const DATA_LOADING_START = 'DATA_LOADING_START';
const DATA_LOADING_SUCCESS = 'DATA_LOADING_SUCCESS';
const DATA_LOADING_FAIL = 'DATA_LOADING_FAIL';

export const startDataLoading = () => ({ type: DATA_LOADING_START });
export const handleUsersLoadingFail = () => ({ type: DATA_LOADING_FAIL });
export const handleUsersLoadingSuccess = posts => ({
  type: DATA_LOADING_SUCCESS,
  posts,
});

export const loadData = () => async(dispatch) => {
  dispatch(startDataLoading());

  try {
    const [postsData, usersData, commentsData] = await Promise.all([
      getPostsFromServer(),
      getUsersFromServer(),
      getCommentsFromServer(),
    ]);

    const allData = postsData.map(
      post => ({
        ...post,
        user: usersData.find(
          user => post.userId === user.id
        ),
        comments: commentsData.filter(
          comment => post.id === comment.postId
        ),
      })
    );

    return dispatch(handleUsersLoadingSuccess(allData));
  } catch (e) {
    dispatch(handleUsersLoadingFail());
  }
};

const initialState = {
  posts: [],
  isLoading: false,
  hasError: false,
};

const dataLoadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case DATA_LOADING_START:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };

    case DATA_LOADING_SUCCESS:
      return {
        ...state,
        posts: action.posts,
        isLoading: false,
      };

    case DATA_LOADING_FAIL:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };

    default:
      return state;
  }
};

export default dataLoadingReducer;
