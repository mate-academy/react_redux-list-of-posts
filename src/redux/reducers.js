import {
  DELETE_COMMENT, LOAD_DATA, DISPLAY, DELETE_POST, UPDATE_INPUT,
}
  from './actions';

const initialState = {
  items: null,
  requested: false,
  inputValue: '',
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_POST:
      return {
        ...state,
        items: state.items.filter((item, index) => action.id !== item.id)
      };
    case DELETE_COMMENT:
      return {
        ...state,
        items: state.items.map((item) => {
          if ((item.id) === action.postId) {
            return {
              ...item,
              comments: item.comments.filter((item) => item.id !== action.id)
            };
          }
          return item;
        }),
      };
    case LOAD_DATA:
      return {
        ...state,
        requested: true,
      };
    case DISPLAY:
      return {
        ...state,
        items: action.data,
      };
    case UPDATE_INPUT:
      return {
        ...state,
        inputValue: action.value,
      };
    default:
      return state;
  }
}
