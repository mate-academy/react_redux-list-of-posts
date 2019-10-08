import { DATA_REQUESTED, DATA_LOADED } from './actions';


const initialState = {
  dataRequested: false,
  postsList: null
}

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {

    case DATA_REQUESTED:
      return {
        ...state,
        dataRequested: true
      }

    case DATA_LOADED:
      return {
        ...state,
        postsList: payload
      }

    default:
      return state
  }
}
