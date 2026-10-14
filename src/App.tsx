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
import { getUsers } from './api/users';
import { setUsers } from './features/user/userSlice';
import { setError, setLoaded, setPosts } from './features/user/postsSlice';
import { setPost } from './features/user/selectedPost';

export const App: React.FC = () => {
  const posts = useAppSelector(state => state.posts.items);

  const author = useAppSelector(state => state.author.author);
  const selectedPost = useAppSelector(state => state.selectedPost.post);

  const isLoading = useAppSelector(state => state.posts.loaded);
  const hasError = useAppSelector(state => state.posts.hasError);
  const dispatch = useAppDispatch();

  function loadUserPosts(userId: number) {
    dispatch(setLoaded(true));

    getUserPosts(userId)
      .then(postData => {
        dispatch(setPosts(postData));
      })
      .catch(() => dispatch(setError(true)))
      .finally(() => dispatch(setLoaded(false)));
  }

  useEffect(() => {
    getUsers().then(data => {
      dispatch(setUsers(data));
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch(setPost(null));

    if (author) {
      dispatch(setError(false));
      loadUserPosts(author.id);
    } else {
      dispatch(setPosts([]));
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

                {author && isLoading && <Loader />}

                {author && !isLoading && hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author && !isLoading && !hasError && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && !isLoading && !hasError && posts.length > 0 && (
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
