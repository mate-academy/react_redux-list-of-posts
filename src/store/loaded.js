import { START_LOADING } from '../actions';

export const getIsLoaded = state => state.isLoaded;

export const loadedReducer = (
  isLoaded = false, action
) => {
  switch (action.type) {
    case START_LOADING:
      return true;
    default:
      return isLoaded;
  }
};
