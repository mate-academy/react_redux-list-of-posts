import React from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import PostsList from './PostsList'

const initialState = {
  posts: [],
  filterPosts: [],
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'FILTER_POSTS':
      return {
        ...state,
        filterPosts: state.posts.filter(post => (
          [post.title, post.body]
            .join('')
            .toLowerCase()
            .includes(action.value.toLowerCase())
        ))
      }
      case 'SET_DATA':
        return {
          posts: action.value,
          filterPosts: action.value,
          isLoading: false,
          isLoaded: true,
        }

      case 'LOADING':
        return {
          ...state,
          isLoading: true,
        }

    default:
      return state;
  }
}

const store = createStore(reducer, initialState)

const App = () => (
  <Provider store={store}>
    <PostsList />
  </Provider>
)

export default App;
