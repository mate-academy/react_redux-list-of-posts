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
    filterPosts,
    loadData,
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


const filterPosts = (state: InitialStateInterface) => {
  const preparedPost = state.preparedPosts;
  const { fieldQuery } = state;

  return preparedPost
    .filter(post => post.body.includes(fieldQuery) || post.title.includes(fieldQuery));
};

const mapStateToProps = (state: InitialStateInterface) => ({
  isLoading: state.isLoading,
  isLoaded: state.isLoaded,
  filterPosts: filterPosts(state),
});

const mapDispatchToProps = (dispatch: ThunkDispatch< {}, {}, AnyAction>) => ({
  loadData: () => dispatch(loadData()),
  setFiledQuery: (value: string) => dispatch(fieldFilter(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
