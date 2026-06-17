/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
import React, { useEffect } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import {
  initPosts,
  clearPosts,
  setSelectedPost,
} from './features/counter/users/postsSlice';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { initUsers } from './features/counter/users/usersSlice';
import { setAuthor } from '../src/features/counter/users/authorSlice';

export const App: React.FC = () => {
  const selectedAuthor = useAppSelector(state => state.author);
  const dispatch = useAppDispatch();
  const {
    items: posts,
    loaded,
    hasError,
    selectedPost,
  } = useAppSelector(state => state.posts);

  useEffect(() => {
    dispatch(initUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setSelectedPost(null));

    if (selectedAuthor) {
      dispatch(initPosts(selectedAuthor.id));
    } else {
      dispatch(clearPosts());
    }
  }, [selectedAuthor, dispatch]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  value={selectedAuthor}
                  onChange={user => dispatch(setAuthor(user))}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedAuthor && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {selectedAuthor && !loaded && <Loader />}

                {selectedAuthor && loaded && hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {selectedAuthor && loaded && !hasError && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">No posts yet</div>
                )}

                {selectedAuthor && loaded && !hasError && posts.length > 0 && (
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
              { 'Sidebar--open': selectedPost },
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
