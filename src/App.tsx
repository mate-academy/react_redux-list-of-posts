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
import * as postsActions from './features/Slices/postSlise';
import { clearPost } from './features/Slices/selectedPostSlice';
export const App: React.FC = () => {
  const { items, loaded, hasError } = useAppSelector(state => state.posts);

  const author = useAppSelector(state => state.author.author);
  const selectedPost = useAppSelector(state => state.selectedPost.selectedPost);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearPost());

    if (author) {
      const loadUserPosts = async (userId: number) => {
        await dispatch(postsActions.fetchPosts(userId));
      };

      loadUserPosts(author.id);
    } else {
      dispatch(postsActions.clearPosts());
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

                {author && loaded && <Loader />}

                {author && !loaded && hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author && !loaded && !hasError && items.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && !loaded && !hasError && items.length > 0 && (
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
