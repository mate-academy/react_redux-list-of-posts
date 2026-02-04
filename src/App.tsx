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
import { fetchUsers } from './slices/users';
import { setAuthor } from './slices/authors';
import { fetchPosts, resetPosts } from './slices/posts';
import { clearSelectedPost } from './slices/selectedPost';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const author = useAppSelector(state => state.author.value);

  const postsLoaded = useAppSelector(state => state.posts.loaded);
  const postsError = useAppSelector(state => state.posts.hasError);
  const selectedPost = useAppSelector(state => state.selectedPost.value);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(clearSelectedPost());

    if (author) {
      dispatch(fetchPosts(author.id));
    } else {
      dispatch(resetPosts());
    }
  }, [author, dispatch]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  value={author}
                  onChange={user => dispatch(setAuthor(user))}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!author && <p data-cy="NoSelectedUser">No user selected</p>}

                {author && !postsLoaded && <Loader />}

                {author && postsLoaded && postsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author && postsLoaded && !postsError && <PostsList />}
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
