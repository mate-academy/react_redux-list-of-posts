import { AnyAction } from 'redux';

const SET_FILTER_OPTION = 'SET_FILTER_OPTION';

export const setFilterOption = (option: string) => ({ type: SET_FILTER_OPTION, payload: option });

const reducer = (option = '', action: AnyAction) => {
  switch (action.type) {
    case SET_FILTER_OPTION:

      return action.payload;

    default:
      return option;
  }
};

export default reducer;
