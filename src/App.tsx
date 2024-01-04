import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUserPosts } from './api/posts';
import { User } from './types/User';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getUsers } from './api/users';
import { addUser } from './features/users/usersSlice';
import {
  setPosts,
  setError,
  setLoaded,
} from './features/posts/postsSlice';
import {
  setSelectPost,
} from './features/selectedpost/selectedPost';

export const App: React.FC = () => {
  const { posts, loaded, hasError } = useAppSelector(state => state.post);
  const { selectedPost } = useAppSelector(state => state.selectedPost);

  const [author, setAuthor] = useState<User | null>(null);

  const dispatch = useAppDispatch();

  const loadUserPosts = React.useCallback((userId: number) => {
    dispatch(setLoaded(false));

    getUserPosts(userId)
      .then((postsData) => {
        dispatch(setPosts(postsData));
      })
      .catch(() => dispatch(setError(true)))
      .finally(() => dispatch(setLoaded(true)));
  }, [dispatch]);

  useEffect(() => {
    dispatch(setSelectPost(null));

    if (author) {
      loadUserPosts(author.id);
    } else {
      setPosts([]);
    }
  }, [author, dispatch, loadUserPosts]);

  useEffect(() => {
    getUsers()
      .then((usersData) => {
        dispatch(addUser(usersData));
      });
  }, [dispatch]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector value={author} onChange={setAuthor} />
              </div>

              <div className="block" data-cy="MainContent">
                {!author && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {author && !loaded && (
                  <Loader />
                )}

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

                {author
                && loaded && !hasError && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    selectedPostId={selectedPost?.id}
                    onPostSelected={(post) => dispatch(setSelectPost(post))}
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
