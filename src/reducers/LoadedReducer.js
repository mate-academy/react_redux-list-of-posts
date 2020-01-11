const CHANGE_LOADED = 'CHANGE_LOADED';

export const changeLoaded = value => ({
  type: CHANGE_LOADED, value,
});

const loadedReducer = (state = false, action) => {
  switch (action.type) {
    case CHANGE_LOADED:
      return action.value;
    default:
      return state;
  }
};

export default loadedReducer;
