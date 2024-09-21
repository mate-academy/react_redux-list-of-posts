import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector/UserSelector';
import { Loader } from './components/Loader';
import { getUserPosts } from './api/posts';
import { User } from './types/User';
import { getUsers } from './api/users';
import { usersSlice } from './store/usersSlice';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { postsSlice } from './store/postsSlice';
import { selectedPostSlice } from './store/selectedPostSlice';

export const App: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [hasError, setError] = useState(false);

  const posts = useAppSelector(state => state.posts.posts);
  const author = useAppSelector(state => state.author.author);
  const selectedPost = useAppSelector(state => state.selectedPost.selectedPost);

  const dispatch = useAppDispatch();

  function loadUserPosts(userId: number) {
    setLoaded(false);

    getUserPosts(userId)
      .then(_posts => dispatch(postsSlice.actions.setPosts(_posts)))
      .catch(() => setError(true))
      .finally(() => setLoaded(true));
  }

  useEffect(() => {
    getUsers().then((users: User[]) => {
      dispatch(usersSlice.actions.setUsers(users));
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch(selectedPostSlice.actions.setSelectedPost(null));

    if (author) {
      loadUserPosts(author.id);
    } else {
      dispatch(postsSlice.actions.setPosts([]));
    }
  }, [author]);

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
                  <PostsList posts={posts} selectedPostId={selectedPost?.id} />
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
