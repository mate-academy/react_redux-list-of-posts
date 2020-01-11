const ACTION_TYPE_SET_LOADED = 'setLoaded';

export const createActionSetLoaded = () => ({
  type: ACTION_TYPE_SET_LOADED,
});

const isLoadedReducer = (isLoaded = false, action) => {
  switch (action.type) {
    case ACTION_TYPE_SET_LOADED:
      return true;

    default:
      return isLoaded;
  }
};

export default isLoadedReducer;
