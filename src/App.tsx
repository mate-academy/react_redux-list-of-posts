/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { clearPosts, fetchPosts, selectPost } from './features/postsSlice';
import { clearComments } from './features/commentsSlice';


export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { author } = useAppSelector(state => state.users);
  const {
    items: posts,
    loaded,
    hasError,
    selectedPost,
  } = useAppSelector(state => state.posts);
  const hasErrorCondition = author && loaded && hasError;
  const hasNoPostsCondition = author && loaded && !hasError && !posts.length;
  const hasPostsCondition = author && loaded && !hasError && !!posts.length;

  useEffect(() => {
    dispatch(selectPost(null));
    dispatch(clearComments());

    if (author) {
      dispatch(fetchPosts(author.id));
    } else {
      dispatch(clearPosts());
    }
  }, [author?.id]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector />
              </div>

              <div className="block" data-cy="MainContent">
                {!author && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {author && !loaded && (
                  <Loader />
                )}
                {hasErrorCondition && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}
                {hasNoPostsCondition && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}
                {hasPostsCondition && (
                  <PostsList />
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
              {selectedPost && (
                <PostDetails post={selectedPost} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
