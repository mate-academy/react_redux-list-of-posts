import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { setSelectedPost } from './features/selectedPostSlice';
import { getPosts } from './features/postsSlice';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { clearUsers } from './features/usersSlice';

export const App: React.FC = () => {
  const { posts, isLoading, hasError }
  = useAppSelector(state => state.posts);
  const dispatch = useAppDispatch();

  const [author, setAuthor] = useState<User | null>(null);
  const selectedPost
  = useAppSelector((state) => state.selectedPost.selectedPost);

  const handleUserSelect = (selectedUser: User | null) => {
    setAuthor(selectedUser);
    dispatch(setSelectedPost(null));
  };

  useEffect(() => {
    function loadUserPosts(userId: number) {
      dispatch(getPosts(userId));
    }

    setSelectedPost(null);

    if (author) {
      loadUserPosts(author.id);
    }
  }, [author, dispatch]);

  useEffect(() => {
    clearUsers();
  }, [author]);

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
                {!author && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {author && isLoading && (
                  <Loader />
                )}

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
                  <PostsList
                    posts={posts}
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
