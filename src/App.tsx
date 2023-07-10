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
import * as postsActions from './features/posts/postsSlice';
// eslint-disable-next-line @typescript-eslint/no-unused-vars, max-len
import * as selectedPostActions from './features/selectedPost/selectedPostSlice';
import {
  authorSelector,
  postsSelector,
  selectedPostSelector,
} from './helpers/funcState';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector(postsSelector);
  const { author } = useAppSelector(authorSelector);
  const { selectedPost } = useAppSelector(selectedPostSelector);

  useEffect(() => {
    dispatch(selectedPostActions.add(null));

    if (author) {
      dispatch(postsActions.init(author.id));
    } else {
      dispatch(postsActions.reset);
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

                {author && loading && (
                  <Loader />
                )}

                {author && !loading && error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author && !loading && !error && items.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && !loading && !error && items.length > 0 && (
                  <PostsList
                    selectedPostId={selectedPost?.id}
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
