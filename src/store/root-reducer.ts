import {
  Reducer,
  Dispatch,
} from 'redux';

import {
  ActionType,
  InitialState,
  DispatchAction,
  initialState,
} from '../constants/types';

import { getPosts } from '../utils/helpers';

export const rootReducer: Reducer<InitialState, DispatchAction> = (
  state = initialState, action,
) => {
  switch (action.type) {
    case ActionType.SetInputValue:
      return {
        ...state,
        inputValue: action.payload.inputValue || '',
      };
    case ActionType.SetFilterValue:
      return {
        ...state,
        filterValue: action.payload.filterValue || '',
      };
    case ActionType.SetIsLoading:
      return {
        ...state,
        isLoading: action.payload.isLoading || false,
      };
    case ActionType.LoadData:
      return {
        ...state,
        posts: action.payload.posts || [],
      };
    case ActionType.SetIsLoadSuccess:
      return {
        ...state,
        isLoadSuccess: action.payload.isLoadSuccess || false,
      };
    case ActionType.SetIsLoadError:
      return {
        ...state,
        isLoadError: action.payload.isLoadError || false,
      };
    default:
      return state;
  }
};

export class RootDispatcher {
  private readonly dispatch: Dispatch<DispatchAction>;

  constructor(dispatch: Dispatch<DispatchAction>) {
    this.dispatch = dispatch;
  }

  setInputValue = (inputValue: string) => {
    this.dispatch({
      type: ActionType.SetInputValue,
      payload: {
        inputValue,
      },
    });
  };

  setFilterValue = (filterValue: string) => {
    this.dispatch({
      type: ActionType.SetFilterValue,
      payload: {
        filterValue,
      },
    });
  };

  setIsLoading = (isLoading: boolean) => {
    return this.dispatch({
      type: ActionType.SetIsLoading,
      payload: {
        isLoading,
      },
    });
  };

  setIsLoadSuccess = (isLoadSuccess: boolean) => {
    return this.dispatch({
      type: ActionType.SetIsLoadSuccess,
      payload: {
        isLoadSuccess,
      },
    });
  };

  setIsLoadError = (isLoadError: boolean) => {
    return this.dispatch({
      type: ActionType.SetIsLoadError,
      payload: {
        isLoadError,
      },
    });
  };

  loadData = () => {
    console.log('Works here');

    return async (dispatch: Dispatch) => {
      console.log('Not working here');
      dispatch(this.setIsLoading(true));

      try {
        const posts = await getPosts();

        dispatch({
          type: ActionType.LoadData,
          payload: {
            posts,
          },
        });

        dispatch(this.setIsLoadSuccess(true));
      } catch (error) {
        dispatch(this.setIsLoadError(true));
      } finally {
        this.setIsLoading(false);
      }
    };
  };
}
