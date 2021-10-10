import { AnyAction } from 'redux';

const SELECTED_USER = 'SELECTED_USER';

export const setSelectUser = (userId: string) => ({
  type: SELECTED_USER,
  payload: userId,
});

const initialState: UserIdState = {
  selectedUser: '0',
};

const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SELECTED_USER:
      return {
        ...state,
        selectedUser: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
