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

import { RootState } from './app/store';
import { useDispatch, useSelector } from 'react-redux';
import {
  setPosts,
  setPostsLoaded,
  setPostsError,
  setSelectedPost,
  setAuthor,
  setUsers,
} from './features/counter/AppSlice';
import { getUsers } from './api/users';

export const App: React.FC = () => {
  const posts = useSelector((state: RootState) => state.app.posts.items);
  const loaded = useSelector((state: RootState) => state.app.posts.loaded);
  const hasError = useSelector((state: RootState) => state.app.posts.hasError);

  const author = useSelector((state: RootState) => state.app.author);
  const selectedPost = useSelector(
    (state: RootState) => state.app.selectedPost,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    getUsers().then(users => dispatch(setUsers(users)));
  }, [dispatch]);

  useEffect(() => {
    dispatch(setSelectedPost(null));

    if (!author) {
      dispatch(setPosts([]));

      return;
    }

    dispatch(setPostsLoaded(false));

    getUserPosts(author?.id || 0)
      .then(userPosts => dispatch(setPosts(userPosts)))
      .catch(() => dispatch(setPostsError(true)))
      .finally(() => dispatch(setPostsLoaded(true)));
  }, [author, dispatch]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  value={author}
                  onChange={user => dispatch(setAuthor(user))}
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
