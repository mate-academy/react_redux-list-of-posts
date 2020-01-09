const TYPE_CHANGE_LOADING = 'CHANGE_LOADING';
const TYPE_CHANGE_LOADED = 'CHANGE_LOADED';
const TYPE_CHANGE_ERROR = 'CHANGE_ERROR';

export const changeLoading = value => ({
  type: TYPE_CHANGE_LOADING, value,
});
export const changeLoaded = value => ({
  type: TYPE_CHANGE_LOADED, value,
});
export const changeError = value => ({
  type: TYPE_CHANGE_ERROR, value,
});

const loadingState = {
  isLoading: false,
  loaded: false,
  error: false,
};

const loadingReducer = (state = loadingState, action) => {
  switch (action.type) {
    case TYPE_CHANGE_LOADING:
      return {
        ...state,
        isLoading: action.value,
      };
    case TYPE_CHANGE_LOADED:
      return {
        ...state,
        loaded: action.value,
      };
    case TYPE_CHANGE_ERROR:
      return {
        ...state,
        error: action.value,
      };
    default:
      return state;
  }
};

export default loadingReducer;
