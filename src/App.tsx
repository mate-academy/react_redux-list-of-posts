import React, { useEffect } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUserPosts } from './api/posts';
import { useAppDispatch, useAppSelector } from './app/hooks';

import {
  setAuthor,
  setPosts,
  setPostsLoading,
  setPostsError,
  setSelectedPost,
  clearSelectedPost,
} from './features/postsSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const posts = useAppSelector(state => state.posts.items);
  const loaded = useAppSelector(state => state.posts.loaded);
  const hasError = useAppSelector(state => state.posts.hasError);
  const authorId = useAppSelector(state => state.posts.selectedAuthorId);
  const selectedPostId = useAppSelector(state => state.posts.selectedPostId);

  function loadUserPosts(userId: number) {
    dispatch(setPostsLoading());

    getUserPosts(userId)
      .then(data => {
        dispatch(setPosts(data));
      })
      .catch(() => dispatch(setPostsError()));
  }

  useEffect(() => {
    dispatch(clearSelectedPost());

    if (authorId) {
      loadUserPosts(authorId);
    } else {
      dispatch(setPosts([]));
    }
  }, [authorId, dispatch]);

  const selectedPost = posts.find(post => post.id === selectedPostId);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  value={authorId}
                  onChange={userID => dispatch(setAuthor(userID))}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!authorId && <p data-cy="NoSelectedUser">No user selected</p>}

                {authorId && !loaded && <Loader />}

                {authorId && loaded && hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {authorId && loaded && !hasError && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {authorId && loaded && !hasError && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    selectedPostId={selectedPostId || undefined}
                    onPostSelected={post => {
                      if (post) {
                        dispatch(setSelectedPost(post.id));
                      } else {
                        dispatch(clearSelectedPost());
                      }
                    }}
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
