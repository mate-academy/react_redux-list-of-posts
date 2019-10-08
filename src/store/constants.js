export const initialState = {
  postListFromServer: [],
  postList: [],
  filteredList: [],
  isLoading: false,
  isLoaded: false,
  isError: false,
  buttonText: 'Load',
};

export const START_LOADING = 'START_LOADING';
export const HANDLE_SUCCESS = 'HANDLE_SUCCESS';
export const HANDLE_ERROR = 'HANDLE_ERROR';
export const FILTER_LIST = 'FILTER_LIST';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const DELETE_POST = 'DELETE_POST';
export const RESET_LIST = 'RESET_LIST';
