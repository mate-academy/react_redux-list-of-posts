import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from './api/users';
import { setUsers, setUsersError } from './features/users/usersSlice';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUserPosts } from './api/posts';

import { RootState } from './app/store';
import { setAuthor } from './features/author/authorSlice';
import { setPosts, setError, setLoaded } from './features/posts/postsSlice';
import { setSelectedPost } from './features/selectedPost/selectedPostSlice';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.posts.items);
  const loaded = useSelector((state: RootState) => state.posts.loaded);
  const hasError = useSelector((state: RootState) => state.posts.hasError);

  const author = useSelector((state: RootState) => state.author.current);
  const selectedPostId = useSelector(
    (state: RootState) => state.selectedPost.id,
  );

  const users = useSelector((state: RootState) => state.users.items);

  useEffect(() => {
    dispatch(setSelectedPost(null));

    if (author) {
      dispatch(setLoaded(false));

      getUserPosts(author.id)
        .then(data => dispatch(setPosts(data)))
        .catch(() => dispatch(setError(true)))
        .finally(() => dispatch(setLoaded(true)));
    } else {
      dispatch(setPosts([]));
    }
  }, [author, dispatch]);

  useEffect(() => {
    getUsers()
      .then(data => dispatch(setUsers(data)))
      .catch(() => dispatch(setUsersError()));
  }, [dispatch]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  value={author}
                  onChange={u => dispatch(setAuthor(u))}
                  users={users}
                />
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
                  <PostsList
                    posts={posts}
                    selectedPostId={selectedPostId ?? undefined}
                    onPostSelected={post => dispatch(setSelectedPost(post))}
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
                'Sidebar--open': selectedPostId,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPostId && (
                <PostDetails post={posts.find(p => p.id === selectedPostId)!} />
              )}{' '}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
