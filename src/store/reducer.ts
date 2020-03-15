import { Reducer } from 'redux';

import {
  ActionType,
  InitialState,
  Action,
  initialState,
} from '../constants/types';


export const reducer: Reducer<InitialState, Action> = (
  state = initialState, action,
) => {
  switch (action.type) {
    case ActionType.SetInputValue:
      return {
        ...state,
        inputValue: action.payload || '',
      };
    case ActionType.SetFilterValue:
      return {
        ...state,
        filterValue: action.payload || '',
      };
    case ActionType.SetIsLoading:
      return {
        ...state,
        isLoading: action.payload || false,
      };
    case ActionType.LoadData:
      return {
        ...state,
        posts: action.payload || [],
      };
    case ActionType.SetIsLoadSuccess:
      return {
        ...state,
        isLoadSuccess: action.payload || false,
      };
    case ActionType.SetIsLoadError:
      return {
        ...state,
        isLoadError: action.payload || false,
      };
    case ActionType.DeletePost:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload),
      };
    case ActionType.DeleteComment:
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post.id !== action.payload.postId) {
            return post;
          }

          return {
            ...post,
            comments: post.comments.filter(comment => comment.id !== action.payload.commentId),
          };
        }),
      };
    default:
      return state;
  }
};
