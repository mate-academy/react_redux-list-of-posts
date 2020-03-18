import React, { FC } from 'react';
import { connect } from 'react-redux';

import './App.css';
import { loadData } from './store/store';
import { PostList } from './components/PostList/PostsList';
import {FilterField} from './components/FilterField/FilterField';



interface AppProps {
  isLoaded: boolean;
  isLoading: boolean;
  loadData: any; // Как описать action
  filteredPosts: PostsWithUser[];
}

const App: FC<AppProps> = (props) => {
  const {
    isLoaded,
    isLoading,
    loadData,
    filteredPosts,
  } = props;

  const handleClick = () => {
    loadData();
  };

  console.log(filteredPosts);

  return (
    <div className={`app ${isLoaded ? 'app-loaded' : ''}`}>
      <h1 className="title is-1">Hello Mate!</h1>
      {
        isLoaded
          ? (
            <>
              <FilterField />
              <PostList filteredPosts={filteredPosts} />
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

const mapStateToProps = (state: InitialStateInterface) => ({
  isLoading: state.isLoading,
  isLoaded: state.isLoaded,
  filteredPosts: showPreperedPost(state),
});

const mapDipatchToProps = (dispatch: any) => ({
  loadData: () => dispatch(loadData()),
});

export default connect(
  mapStateToProps,
  mapDipatchToProps,
)(App);
