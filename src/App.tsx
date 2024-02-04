import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from './app/hooks'; // !
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUsers } from './api/users';
import { setUsers } from './features/usersSlice';
import { RootState } from './app/store';
import { fetchPosts } from './features/postsSlice';
import { setSelectedPost } from './features/selectedPost';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const author = useAppSelector((state: RootState) => state.author.author);
  const { posts, loaded, hasError } = useAppSelector(
    (state: RootState) => state.posts,
  );
  const selectedPost = useAppSelector(
    (state: RootState) => state.selectedPost.selectedPost,
  );

  useEffect(() => {
    dispatch(setSelectedPost(null));

    getUsers().then((data) => {
      dispatch(setUsers(data));
    });
  }, [dispatch]);

  function loadUserPosts(userId: number) {
    dispatch(fetchPosts(userId));
  }

  useEffect(() => {
    // we clear the post when an author is changed
    // not to confuse the user
    dispatch(setSelectedPost(null));
    if (author) {
      loadUserPosts(author.id);
    }
  }, [author]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector value={author} />
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
