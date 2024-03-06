import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { loadUsers } from './features/users/usersSlice';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { loadedUserPosts, removePosts } from './features/posts/postsSlice';
import { removePost } from './features/selectedPosts/selectedPostsSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { author } = useAppSelector(store => store.author);
  const { loaded, hasError, items } = useAppSelector(store => store.posts);

  const { currentPost } = useAppSelector(store => store.selectedPost);

  useEffect(() => {
    // we clear the post when an author is changed
    // not to confuse the user
    dispatch(removePost());

    if (author) {
      dispatch(loadedUserPosts(author.id));
    } else {
      dispatch(removePosts());
    }
  }, [author, dispatch]);
  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

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
                'Sidebar--open': currentPost,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {currentPost && <PostDetails />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
