import React, { FC } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

import './App.css';
import { loadData } from './store/store';
import { PostList } from './components/PostList/PostsList';
import { FilterField } from './components/FilterField/FilterField';
import {fieldFilter} from './store/actionCreators';


interface AppProps {
  isLoaded: boolean;
  isLoading: boolean;
  loadData: () => void;
  filterPosts: PostsWithUser[];
  setFiledQuery: (arg0: string) => void;
}

const App: FC<AppProps> = (props) => {
  const {
    isLoaded,
    isLoading,
    loadData,
    filterPosts,
    setFiledQuery,
  } = props;

  const handleClick = () => {
    loadData();
  };

  return (
    <div className={`app ${isLoaded ? 'app-loaded' : ''}`}>
      <h1 className="title is-1">Hello Mate!</h1>
      {
        isLoaded
          ? (
            <>
              <FilterField setFiledQuery={setFiledQuery} />
              <PostList filterPosts={filterPosts} />
            </>
          )
          : (
            <button type="button" onClick={handleClick} className="button is-primary is-outlined">
              Load Data
            </button>
          )
      }

      {
        isLoading
          && (
            <p>is Loading...</p>
          )
      }
    </div>
  );
};

// import { SORT_TYPES} from "./store/store";



// SELECTOR FUNCTION
// const getSortedPosts = (state: any) => {
//   const { filteredPosts, sortField } = state;
//
//   switch (sortField) {
//     case SORT_TYPES.name:
//       return [...filteredPosts].sort();
//
//
//
//     default:
//       return filteredPosts;
//   }
// };


const showPreperedPost = (state: InitialStateInterface) => {
  const { posts, users, comments } = state;

  return posts.map((post) => (
    {
      ...post,
      user: users.find((user) => user.id === post.userId) as User,
      comments: comments.filter((comment) => comment.postId === post.id),
    }
  ));
};

const filterPosts = (state: InitialStateInterface) => {
  const prepearedPost = showPreperedPost(state);
  const { fieldQuery } = state;

  return prepearedPost
    .filter(post => post.body.includes(fieldQuery) || post.title.includes(fieldQuery));
};

const mapStateToProps = (state: InitialStateInterface) => ({
  isLoading: state.isLoading,
  isLoaded: state.isLoaded,
  filterPosts: filterPosts(state),
});

const mapDipatchToProps = (dispatch: ThunkDispatch< {}, {}, AnyAction>) => ({
  loadData: () => dispatch(loadData()),
  setFiledQuery: (value: string) => dispatch(fieldFilter(value)),
});

export default connect(
  mapStateToProps,
  mapDipatchToProps,
)(App);
