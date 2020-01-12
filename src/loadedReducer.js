export const SET_LOADED = 'SET_LOADED';

export const setLoadedAC = value => ({
  type: SET_LOADED, value,
});

const loadedReducer = (loaded = false, action) => {
  switch (action.type) {
    case SET_LOADED:
      return action.value;
    default:
      return loaded;
  }
};

export default loadedReducer;
