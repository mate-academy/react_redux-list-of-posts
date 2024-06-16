import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useAppSelector } from './app/hooks';
import { fetchPosts, selectPostState } from './features/postsSlice';
import { fetchUsers } from './features/usersSlice';
import { selectAuthor } from './features/authorSlice';
import { selectPost } from './features/selectedPostSlice';
import { useDispatch } from 'react-redux';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();
  const {
    loading: loaded,
    error: hasError,
    posts,
  } = useAppSelector(selectPostState);
  const author = useAppSelector(selectAuthor);
  const post = useAppSelector(selectPost);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (author) {
      dispatch(fetchPosts(author.id));
    }
  }, [author, dispatch]);

  const openedSideBar = () => {
    if (!post || !author || post.userId !== author.id) {
      return false;
    }

    return true;
  };

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

                {loaded && <Loader />}

                {hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author && !loaded && !hasError && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && !loaded && !hasError && posts.length > 0 && (
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
                'Sidebar--open': openedSideBar(),
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {post && <PostDetails post={post} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
