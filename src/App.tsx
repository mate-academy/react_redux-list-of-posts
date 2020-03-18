import React, { FC } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { loadData } from './store/store';

const App: FC<any> = (props) =>{

  const {
    isLoaded,
    isLoading,
    loadData,
    posts,
    users,
    comments,
    filteredPosts,
  } = props;

  const handleClick = () => {
    loadData();
  };

  console.log(
    filteredPosts
  );

  return (
    <div className="App">
      <h1>Hello Mate!</h1>
      <p>
        isLoaded
        {` ${isLoaded}`}
      </p>
      <p>
        isLoading
        {` ${isLoading}`}
      </p>
      <button type="button" onClick={handleClick}>
        Load Data
      </button>
      <ul>
        {
          users.length && posts.length && comments.length
            ? (
              users.map((user: User) => (
                <li>{user.id}</li>
              ))
            )
            : null
        }
      </ul>
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
  posts: state.posts,
  filteredPosts: showPreperedPost(state),
  users: state.users,
  comments: state.comments,
});

const mapDipatchToProps = (dispatch: any) => ({
  loadData: () => dispatch(loadData()),
});

export default connect(
  mapStateToProps,
  mapDipatchToProps,
)(App);
