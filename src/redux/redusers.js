import { LOAD, DISPLAY, REMOVE_POST, REMOVE_COMMENT, GET_INPUT_VALUE } from './actions';

const initialState = {
  requested: false,
  data: null,
  inputValue: null,
  search: false,
};

export default function getNextState(state = initialState, action) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        requested: true,
      };
    case DISPLAY:
      return {
        ...state,
        data: action.data,
      };
    case REMOVE_POST:
      return {
        ...state,
        data: action.data,
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        data: action.data,
      };
    case GET_INPUT_VALUE:
      const inputValueTrim = action.value.trim();
      const searchBool = inputValueTrim !== null && inputValueTrim !== "" ? true : false;
      return {
        ...state,
        inputValue: inputValueTrim,
        search: searchBool,
      };
    default:
      return state;
  }
}
