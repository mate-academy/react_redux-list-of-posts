import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUserPosts } from './api/posts';
import { Counter } from './features/counter/Counter';
import { useAppSelector } from './app/hooks';
import { actions as postsActions } from './features/postsSlice';
import * as userActions from './features/userSlice';
import { actions as selectedPostActions } from './features/selectedPostSlice';
import { getUsers } from './api/users';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useAppSelector(state => state.posts);
  const { author } = useAppSelector(state => state.author);
  const { selectedPost } = useAppSelector(state => state.selectedPost);

  const loadUserPosts = async (userId: number) => {
    dispatch(postsActions.setLoading(true));

    let response;

    try {
      response = await getUserPosts(userId);

      dispatch(postsActions.addPosts(response));
    } catch {
      dispatch(postsActions.setError(true));
    } finally {
      dispatch(postsActions.setLoading(false));
    }
  };

  const loadUsers = async () => {
    const response = await getUsers();

    dispatch(userActions.setUsers(response));
  };

  useEffect(() => {
    dispatch(selectedPostActions.clearPost);
    // dispatch(userActions.loadUsers())
    loadUsers();

    if (author) {
      loadUserPosts(author.id);
    } else {
      dispatch(postsActions.clearPosts);
    }
  }, [author?.id]);

  return (
    <main className="section">
      {/* Learn the Redux Toolkit usage example in src/app and src/features/counter */}
      <Counter />

      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector />
              </div>

              <div className="block" data-cy="MainContent">
                {!author && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {author && loading && (
                  <Loader />
                )}

                {author && !loading && error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author && !loading && !error && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && !loading && !error && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    selectedPostId={selectedPost?.id}
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
              {selectedPost && (
                <PostDetails post={selectedPost} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
