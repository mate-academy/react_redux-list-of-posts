import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { Post } from './types/Post';
import { useAppSelector } from './app/hooks';
import { authorSlice } from './components/author';
import { fetchPosts, postsSlice } from './components/Posts';
import { selectedPostSlice } from './components/SelectedPost';
import { RootState } from './app/store';

export const App: React.FC = () => {
  const author = useAppSelector(state => state.author.value);
  const posts = useAppSelector(state => state.posts.value);
  const selectedPost = useAppSelector(state => state.selectedPost.value);
  const hasError = useAppSelector(state => state.posts.error);
  const loaded = useAppSelector(state => !state.posts.isLoading);
  const dispatch = useDispatch();
  const thunkDispatch: ThunkDispatch<
  RootState, unknown, AnyAction> = useDispatch();

  const setAuthor = (value: User) => {
    dispatch(authorSlice.actions.set(value));
  };

  const setSelectedPost = (value: Post | null) => {
    dispatch(selectedPostSlice.actions.set(value));
  };

  useEffect(() => {
    dispatch(selectedPostSlice.actions.set(null));

    if (author) {
      thunkDispatch(fetchPosts(author.id));
    } else {
      dispatch(postsSlice.actions.set([]));
    }
  }, [author]);

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

                {author && loaded && !hasError && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    selectedPostId={selectedPost?.id}
                    onPostSelected={setSelectedPost}
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
