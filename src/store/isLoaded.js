export const setIsLoaded = newSetIsLoaded => ({
  type: 'CHANGE_IS_LOADED',
  isLoaded: newSetIsLoaded,
});

const isLoadedReducer = (isLoaded = false, action) => {
  switch(action.type) {
    case 'CHANGE_IS_LOADED':
      return  action.isLoaded;

    default:
      return isLoaded;
  }
};

export default isLoadedReducer;
