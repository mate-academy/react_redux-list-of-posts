import { START_LOADING } from '../actions';

export const getIsLoaded = state => state.isLoaded;

export const loadedReducer = (state = {
  isLoaded: false,
}, action) => {
  switch (action.type) {
    case START_LOADING:
      return {
        isLoaded: true,
      };
    default:
      return state;
  }
};
