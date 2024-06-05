import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUserPosts } from './api/posts';

import { useAppDispatch, useAppSelector } from './app/hooks';
import { init as fetchUsers } from './features/user/userSlice';

import { setCurrentAuthor } from './features/author/authorSlice';

import { setSelectedPost } from './features/selectedPost/selectedPostSlice';

import {
  fetchPosts,
  setError as setPostsError,
  setLoading as setPostsLoading,
} from './features/posts/postsSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const author = useAppSelector(state => state.author.author);
  const {
    items: posts,
    hasError: postsError,
    loaded: postsLoaded,
  } = useAppSelector(state => state.posts);
  const selectedPost = useAppSelector(state => state.selectedPost.selectedPost);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  function loadUserPosts(userId: number) {
    dispatch(setPostsLoading(false));

    getUserPosts(userId)
      .then(postList => dispatch(fetchPosts(postList)))
      .catch(() => dispatch(setPostsError(true)))
      // We disable the spinner in any case
      .finally(() => dispatch(setPostsLoading(true)));
  }

  useEffect(() => {
    // we clear the post when an author is changed
    // not to confuse the user
    dispatch(setSelectedPost(null));

    if (author) {
      loadUserPosts(author.id);
    } else {
      dispatch(fetchPosts([]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, author]);

  // #region conditions
  const noAuthorPicked = !author;
  const showPostsLoader = author && !postsLoaded;
  const fetchPostsErrorNotification = author && postsLoaded && postsError;
  const noPostsNotification =
    author && postsLoaded && !postsError && !posts.length;
  const showPostsList = author && postsLoaded && !postsError && !!posts.length;
  // #endregion

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  value={author}
                  onChange={user => dispatch(setCurrentAuthor(user))}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {noAuthorPicked && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {showPostsLoader && <Loader />}

                {fetchPostsErrorNotification && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {noPostsNotification && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {showPostsList && (
                  <PostsList
                    posts={posts}
                    selectedPostId={selectedPost?.id}
                    onPostSelected={post => dispatch(setSelectedPost(post))}
                  />
                )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={classNames(
              'tile',
              'is-parent',
              'is-8-desktop',
              'Sidebar',
              {
                'Sidebar--open': selectedPost,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
