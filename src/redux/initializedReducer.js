const SET_INITIALISE = 'SET_INITIALIZE';

export const setInitialized = value => ({
  type:SET_INITIALISE,
  value,
})

export const initializedReducer = (isInitialized = false, action) => {
  switch (action.type) {
    case SET_INITIALISE:
      return action.value;
    default:
      return isInitialized;
  }
}

export default initializedReducer;
