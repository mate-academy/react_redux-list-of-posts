import { AnyAction } from 'redux';

const defaultState = {
  comments: [],
};

type Comment = {
  id: number;
  title: string;
  body: string;
};

type RootState = {
  comments: Comment[],
};

export const GET_COMMENTS = 'get_comments';
export const REMOVE_COMMENT = 'remove_comment';

export const commentsReducer = (
  state: RootState = defaultState, action: AnyAction,
) => {
  switch (action.type) {
    case GET_COMMENTS:
      return { comments: action.payload };
    case REMOVE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(com => com.id !== action.payload),
      };
    default:
      return state;
  }
};
