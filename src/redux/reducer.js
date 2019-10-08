import {
  LOAD,
  DISPLAY,
  REMOVE_ARTICLE,
  REMOVE_COMMENT,
} from './actions';

const initialState = {
  requested: false,
  articles: null,
};

function getNextState(state = initialState, action) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        requested: true,
      };
    case DISPLAY:
      return {
        ...state,
        articles: action.articles,
      };
    case REMOVE_ARTICLE:
      return {
        ...state,
        articles: action.articles,
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        articles: action.articles,
      };
    default:
      return state;
  }
}

export default getNextState;
