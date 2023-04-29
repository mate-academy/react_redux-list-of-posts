import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import * as postsActions from './features/posts/postsSlice';
import * as selectedPostsActions
  from './features/selectedPost/selectedPostSlice';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const { author } = useAppSelector(state => state.author);
  const {
    items: posts,
    loaded,
    hasError,
  } = useAppSelector(state => state.posts);
  const { selectedPost } = useAppSelector(state => state.selectedPost);

  useEffect(() => {
    dispatch(selectedPostsActions.clearSelectedPost());

    if (author) {
      dispatch(postsActions.initPosts(author.id));
    } else {
      dispatch(postsActions.clear([]));
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

                {author && loaded && hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author && loaded && !hasError && !posts.length && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && loaded && !hasError && posts.length > 0 && (
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
              {
                'Sidebar--open': selectedPost,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost
                ? <PostDetails />
                : 'Choose a post'}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
