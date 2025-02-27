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
import { fetchPosts, userPostsList } from './features/userPostSlice';
import { selectedAuthor } from './features/author';
import { clearCurrentPost } from './features/currentPost';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(userPostsList);
  const status = useAppSelector(state => state.userPosts.status);
  const error = useAppSelector(state => state.userPosts.error);
  const currentPost = useAppSelector(state => state.currentPost.currentPost);
  const author = useAppSelector(selectedAuthor);

  useEffect(() => {
    if (author) {
      dispatch(fetchPosts(author.id));
    }

    dispatch(clearCurrentPost());
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

                {status === 'loading' && <Loader />}

                {status === 'failed' && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {error || 'Something went wrong!'}
                  </div>
                )}

                {status === 'succeeded' && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {status === 'succeeded' && posts.length > 0 && <PostsList />}
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
            <div className="tile is-child box is-success">
              {<PostDetails />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
