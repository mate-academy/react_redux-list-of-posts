import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

import { fetchUsers } from './features/users';
import { fetchPosts, selectPostState } from './features/posts';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { selectAuthor } from './features/author';
import { selectPost, setSelectedPost } from './features/selectedPost';
import { clearComments } from './features/comments';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const {
    items: posts,
    loaded,
    hasError,
  } = useAppSelector(selectPostState);

  const author = useAppSelector(selectAuthor);
  const selectedPost = useAppSelector(selectPost);

  useEffect(() => {
    dispatch(setSelectedPost(null));

    if (author) {
      dispatch(fetchPosts(author.id));
    }
  }, [author, dispatch]);

  useEffect(() => {
    dispatch(clearComments());
  }, [author, dispatch]);

  useEffect(() => {
    dispatch(fetchUsers());
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

                {author && loaded && !hasError && posts.length === 0 && (
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
              'Sidebar',
              {
                'Sidebar--open': selectedPost,
              },
            )}
          >
            <div className="tile is-child box is-success">
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
