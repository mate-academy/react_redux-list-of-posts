import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { Users } from './components/Users';
import { useEffect } from 'react';
import { useAppSelector } from './app/hooks';
import { AppDispatch } from './app/store';
import { useDispatch } from 'react-redux';
import { Loader } from './components/Loader';
import { PostsList } from './components/PostsList';
import classNames from 'classnames';
import { PostDetails } from './components/PostDetails';

import { loadUsers } from './features/users/usersThunk';

export const App: React.FC = () => {
  const usersStatus = useAppSelector(state => state.users.status);
  const author = useAppSelector(state => state.author.value);
  const userPosts = useAppSelector(state => state.userPosts);
  const selectedPost = useAppSelector(state => state.selectedPost.value);

  const {
    items: posts,
    loaded: postsLoaded,
    loading: postsLoading,
    hasError,
  } = userPosts;

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  useEffect(() => {
    window.history.replaceState(null, '', window.location.pathname);
  }, []);

  const hasNoPosts = author && postsLoaded && !posts.length;

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            {usersStatus === 'failed' && (
              <div className="notification is-danger">
                Something went wrong while loading users!
              </div>
            )}

            <div className="tile is-child box is-success">
              <div className="block">
                <Users />
              </div>
              <div className="block" data-cy="MainContent">
                {!author && <p data-cy="NoSelectedUser">No user selected</p>}{' '}
                {postsLoading && <Loader />}
                {hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong while loading posts!
                  </div>
                )}
                {hasNoPosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}
                {author && postsLoaded && posts.length > 0 && <PostsList />}
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
              { 'Sidebar--open': selectedPost },
            )}
          >
            <div className="tile is-child box is-success ">
              <p data-cy="NoSelectedPost">Choose a post</p>
              <PostDetails />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
