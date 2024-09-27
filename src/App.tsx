/* eslint-disable @typescript-eslint/indent */
import React, { useEffect } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { loadUserPosts, setPosts } from './features/postsSlice';
import { unselectPost } from './features/selectedPostSlice';
import { loadUsers } from './features/usersSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(state => state.posts);
  const author = useAppSelector(state => state.author);
  const selectedPost = useAppSelector(state => state.selectedPost);

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(unselectPost());

    if (author) {
      dispatch(loadUserPosts(author.id));
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
                <UserSelector />
              </div>

              <div className="block" data-cy="MainContent">
                {!author && <p data-cy="NoSelectedUser">No user selected</p>}

                {author && posts.isPostsLoading && <Loader />}

                {author &&
                  !posts.isPostsLoading &&
                  posts.errorMessageOnPostLoading.length > 0 && (
                    <div
                      className="notification is-danger"
                      data-cy="PostsLoadingError"
                    >
                      Something went wrong!
                    </div>
                  )}

                {author &&
                  !posts.isPostsLoading &&
                  posts.errorMessageOnPostLoading.length === 0 &&
                  posts.posts.length === 0 && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}

                {author &&
                  !posts.isPostsLoading &&
                  posts.errorMessageOnPostLoading.length === 0 &&
                  posts.posts.length > 0 && <PostsList />}
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
