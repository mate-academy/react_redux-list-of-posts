import React, { FC, useMemo } from 'react';
import { connect } from 'react-redux';
import { State } from '../../redux/store';
import { PreparedPost } from '../../types';
import {
  setIsLoading,
  setIsLoaded,
  setPosts,
  setHasError,
} from '../../redux/actionCreators';
import { getPreparedPosts } from '../../api_helpers';
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
}

interface Methods {
  changeIsLoading: (status: boolean) => void;
  changeIsLoaded: () => void;
  changeHasError: (status: boolean) => void;
  changeposts: (postsFromApi: PreparedPost[]) => void;
}

type Props = StateProps & Methods;

export const PostListTemplate: FC<Props> = ({
  isLoading,
  isLoaded,
  hasError,
  posts,
  searchValue,
  changeIsLoading,
  changeIsLoaded,
  changeHasError,
  changeposts,

}) => {
  const showedAllPosts = async () => {
    changeIsLoading(true);
    changeHasError(false);

    try {
      const postsFromApi = await getPreparedPosts();

      changeposts(postsFromApi);
    } catch (error) {
      changeHasError(true);
    }

    changeIsLoading(false);
    changeIsLoaded();
  };


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
          onClick={showedAllPosts}
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
                onClick={showedAllPosts}
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
  changeIsLoading: setIsLoading,
  changeIsLoaded: setIsLoaded,
  changeHasError: setHasError,
  changeposts: setPosts,
};

export const PostList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostListTemplate);
