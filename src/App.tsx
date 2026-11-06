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
import { useAppSelector, useAppDispatch } from './store/hooks';
import { setPosts, setError } from './store/posts/posts';
import { setLoading } from './store/posts/posts';
import { setAuthor } from './store/author/author';
import { User } from './types/User';
import { setUsers, setUsersError, setUsersLoading } from './store/users/users';
import { getUsers } from './api/users';

export const App: React.FC = () => {
  const posts = useAppSelector(state => state.posts.items);
  const dispatch = useAppDispatch();
  const hasError = useAppSelector(state => state.posts.hasError);
  const author = useAppSelector(state => state.author);
  const loaded = useAppSelector(state => state.posts.loaded);
  const selectedPost = useAppSelector(state => state.selectedPost);
  const user = useAppSelector(
    state => state.users.items.find((u: User) => u.id === author?.id) || null,
  );

  useEffect(() => {
    dispatch(setUsersLoading());
    getUsers()
      .then(users => dispatch(setUsers(users)))
      .catch(() => dispatch(setUsersError()));
  }, [dispatch]);

  function loadUserPosts(userId: number) {
    dispatch(setLoading());

    getUserPosts(userId)
      .then(data => dispatch(setPosts(data)))
      .catch(() => dispatch(setError()));
  }

  useEffect(() => {
    // we clear the post when an author is changed
    // not to confuse the user
    // setSelectedPost(null);

    if (author) {
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
                <UserSelector
                  value={user}
                  onChange={selectedUser => dispatch(setAuthor(selectedUser))}
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
                    selectedPostId={selectedPost?.id}
                    onPostSelected={selectedPost}
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
                'Sidebar--open': selectedPost,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
