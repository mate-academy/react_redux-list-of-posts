import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { Counter } from './features/counter/Counter';
import { useAppDispatch, useAppSelector } from './app/hooks';
import * as postsActions from './features/posts/posts';
import * as userPostsActions from './features/posts/userPosts';
import * as selectedPostActions from './features/posts/selectedPost';

export const App: React.FC = () => {
  // const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const { user, loading, error } = useAppSelector(state => state.user);
  const { userPosts, userPostError }
    = useAppSelector(state => state.userPosts);
  const dispatch = useAppDispatch();

  const { post } = useAppSelector(state => state.selectedPost);

  useEffect(() => {
    dispatch(selectedPostActions.clearPost);

    if (user) {
      dispatch(userPostsActions.userPosts(user.id));
    } else {
      dispatch(postsActions.remove());
    }
  }, [user?.id]);

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
                {error && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {loading && (
                  <Loader />
                )}

                {user && userPostError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {user && userPosts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {user && userPosts.length > 0 && (
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
                'Sidebar--open': post,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {post && (
                <PostDetails post={post} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
