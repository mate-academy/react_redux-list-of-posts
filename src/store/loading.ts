import { AnyAction } from 'redux';

const LOADING = 'LOADING';

export const loading = () => ({ type: LOADING });

const reducer = (loading = false, action: AnyAction) => {
  switch (action.type) {
    case LOADING:
      return true;

    default:
      return loading;
  }
};

export default reducer;
