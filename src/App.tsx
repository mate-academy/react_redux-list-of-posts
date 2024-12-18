import React, { useEffect } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { RootState } from './app/store';
import * as postsAction from './features/posts/postsSlice';
import * as postAction from './features/selectedPost/selectedPostSlice';

export const App: React.FC = () => {
  const { author } = useAppSelector((state: RootState) => state.author);
  const { selectedPost } = useAppSelector(
    (state: RootState) => state.selectedPost,
  );
  const { items, loaded, hasError } = useAppSelector(
    (state: RootState) => state.posts,
  );
  /* Для типізації dispatch використовуємо кастомний хук, це те саме, що і
    useDispatch, але вже з типом, який дозволяє використовувати його не тільки
    з actions, а й з функціями */
  const dispatch = useAppDispatch();

  useEffect(() => {
    // we clear the post when an author is changed
    // not to confuse the user
    dispatch(postAction.setSelectedPost(null));

    if (author) {
      dispatch(postsAction.importPostsAsync(author.id));
    }
  }, [author, dispatch]);

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
                {!author && <p data-cy="NoSelectedUser">No user selected</p>}

                {author && !loaded && <Loader />}

                {author && loaded && hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author && loaded && !hasError && items.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && loaded && !hasError && items.length > 0 && (
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
              {selectedPost && <PostDetails />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
