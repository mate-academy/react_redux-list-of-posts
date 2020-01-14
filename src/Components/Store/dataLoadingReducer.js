import { postsFromServer } from '../PostsFromServer';
import { usersFromServer } from '../UsersFromServer';
import { commentsFromServer } from '../CommentsFromServer';

const LOADING_START = 'LOADING_START';
const LOADING_SUCCESS = 'LOADING_SUCCESS';
const LOADING_FAIL = 'LOADING_FAIL';

export const startDataLoading = () => ({ type: LOADING_START });
export const handleUsersLoadingFail = () => ({ type: LOADING_FAIL });
export const handleUsersLoadingSuccess = posts => ({
  type: LOADING_SUCCESS,
  posts,
});

// eslint-disable-next-line consistent-return
export const loadData = () => async(dispatch) => {
  dispatch(startDataLoading());

  try {
    const [postsData, usersData, commentsData] = await Promise.all([
      postsFromServer(),
      usersFromServer(),
      commentsFromServer(),
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
  isLoaded: false,
  isLoading: false,
  hasError: false,
};

const dataLoadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_START:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };

    case LOADING_SUCCESS:
      return {
        ...state,
        posts: action.posts,
        isLoading: false,
        isLoaded: true,
      };

    case LOADING_FAIL:
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
