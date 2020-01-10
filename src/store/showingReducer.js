const FINISH_SHOWING = 'FINISH_SHOWING';

export const finishShowing = () => ({ type: FINISH_SHOWING });

const loadingReducer = (state = true, action) => {
  switch (action.type) {
    case FINISH_SHOWING:
      return false;
    default: return state;
  }
};

export default loadingReducer;
