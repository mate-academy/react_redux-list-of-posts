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

import { useAppDispatch, useAppSelector } from './app/hooks';
import { setUsers } from './features/users';
import { clearSelectedPost } from './features/selectedPost';
import {
  clearPosts,
  setPosts,
  setPostsError,
  startPostsLoading,
} from './features/posts';
import { getUsers } from './api/users';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const author = useAppSelector(state => state.author);
  const selectedPost = useAppSelector(state => state.selectedPost);
  const posts = useAppSelector(state => state.posts);

  useEffect(() => {
    getUsers().then(usersFromServer => {
      dispatch(setUsers(usersFromServer));
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch(clearSelectedPost());

    if (!author) {
      dispatch(clearPosts());

      return;
    }

    dispatch(startPostsLoading());

    getUserPosts(author.id)
      .then(postsFromServer => {
        dispatch(setPosts(postsFromServer));
      })
      .catch(() => {
        dispatch(setPostsError());
      });
  }, [author, dispatch]);

  const hasNoAuthor = !author;
  const isPostsLoading = author && !posts.loaded;
  const isPostsError = author && posts.loaded && posts.hasError;

  const hasNoPosts =
    author && posts.loaded && !posts.hasError && posts.items.length === 0;

  const hasPosts =
    author && posts.loaded && !posts.hasError && posts.items.length > 0;

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
                {hasNoAuthor && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isPostsLoading && <Loader />}

                {isPostsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {hasNoPosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {hasPosts && <PostsList />}
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
              {selectedPost && <PostDetails />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
