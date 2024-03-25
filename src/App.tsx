import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setSelectedPost } from './features/selectedPostSlice';
import { getPostsFromServer } from './features/postsSlice';
import { clearUsers } from './features/usersSlice';

export const App: React.FC = () => {
  const [author, setAuthor] = useState<User | null>(null);
  const { posts, loading, hasError } = useAppSelector(state => state.posts);
  const selectedPost = useAppSelector(state => state.selectedPost.selectedPost);
  const dispatch = useAppDispatch();

  const loadUserPosts = useCallback(
    (userId: number) => {
      dispatch(getPostsFromServer(userId));
    },
    [dispatch],
  );

  useEffect(() => {
    clearUsers();
    setSelectedPost(null);

    if (author) {
      loadUserPosts(author.id);
    }
  }, [author, loadUserPosts]);

  const handleUserSelect = (selectedUser: User | null) => {
    setAuthor(selectedUser);
    dispatch(setSelectedPost(null));
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector value={author} onChange={handleUserSelect} />
              </div>

              <div className="block" data-cy="MainContent">
                {!author && <p data-cy="NoSelectedUser">No user selected</p>}

                {author && loading && <Loader />}

                {author && !loading && hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author && !loading && !hasError && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && !loading && !hasError && !!posts.length && (
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
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
