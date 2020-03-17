import React, { FC, useMemo } from 'react';
import { connect } from 'react-redux';
import { State } from '../../redux/store';
import { PreparedPost } from '../../types';
import { showedAllPosts } from '../../redux/actionCreators';
import { SearchPost } from '../SearchPost/SearchPost';
import { Post } from '../Post/Post';
import '../../App.css';
import './PostsList.css';

interface StateProps {
  isLoading: boolean;
  isLoaded: boolean;
  hasError: boolean;
  posts: PreparedPost[] | [];
  searchValue: string;
  changeAllPosts: () => void;
}

type Props = StateProps;

export const PostListTemplate: FC<Props> = ({
  isLoading,
  isLoaded,
  hasError,
  posts,
  searchValue,
  changeAllPosts,
}) => {
  const searchedPost = useMemo(() => posts.filter(
    post => post.title.toLowerCase().includes(searchValue)
    || post.body.toLowerCase().includes(searchValue),
  ), [posts, searchValue]);

  if (isLoading) {
    return (
      <p className="loading">
     Loading...
      </p>
    );
  }

  if (hasError) {
    return (
      <>
        <p className="loading">
        An error has occurred. Please try again later
        </p>
        <button
          type="button"
          className="loading_button"
          onClick={changeAllPosts}
        >
          Try again
        </button>
      </>
    );
  }

  return (
    <div className="wrapper">
      <h1>Dynamic list of posts</h1>
      {(
        !isLoaded
          ? (
            <>
              <p className="initual_loading">
                Load posts
              </p>
              <button
                type="button"
                className="loading_button"
                onClick={changeAllPosts}
              >
                Load
              </button>
            </>
          )
          : (
            <>
              <SearchPost />
              <ul className="posts_wrapper">
                {searchedPost.map(post => <Post key={post.id} post={post} />)}
              </ul>
            </>
          )
      )}
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  isLoading: state.isLoading,
  isLoaded: state.isLoaded,
  hasError: state.hasError,
  posts: state.posts,
  searchValue: state.searchValue,
});

const mapDispatchToProps = {
  changeAllPosts: showedAllPosts,
};

export const PostList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostListTemplate);
