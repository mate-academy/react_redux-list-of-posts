import { AnyAction } from 'redux';

const SELECTED_POST = 'SELECTED_POST';

export const setSelectPost = (postId: number | null) => ({
  type: SELECTED_POST,
  payload: postId,
});

const initialState: PostIdState = {
  selectedPost: null,
};

const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SELECTED_POST:
      return {
        ...state,
        selectedPost: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
