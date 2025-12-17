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
import { fetchUsers, usersSlice } from './features/user/usersSlice';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { User } from './types/User';
import {
  fetchUserPosts,
  postsSlice,
  setPosts,
} from './features/post/postsSlice';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const userPosts = useAppSelector(state => state.posts.userPosts);
  const selectedPost = useAppSelector(state => state.posts.selectedPost);
  const setSelectedPost = (post: Post | null) =>
    dispatch(postsSlice.actions.setSelectedPost(post));

  const isUserPostsLoading =
    useAppSelector(state => state.posts.userPostsStatus) === 'loading';

  const author = useAppSelector(state => state.users.selectedUser);
  const setAuthor = (user: User | null) => {
    dispatch(usersSlice.actions.setUser(user));
  };

  const hasPostsError =
    useAppSelector(state => state.posts.userPostsStatus) === 'failed';

  useEffect(() => {
    dispatch(setSelectedPost(null));

    if (author) {
      dispatch(fetchUserPosts(author.id));
    } else {
      dispatch(setPosts([]));
    }
  }, [author, dispatch]);

  useEffect(() => {
    dispatch(fetchUsers());
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
                {!author && <p data-cy="NoSelectedUser">No user selected</p>}

                {author && isUserPostsLoading && <Loader />}

                {author && !isUserPostsLoading && hasPostsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author &&
                  !isUserPostsLoading &&
                  !hasPostsError &&
                  userPosts.length === 0 && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}

                {author &&
                  !isUserPostsLoading &&
                  !hasPostsError &&
                  userPosts.length > 0 && (
                    <PostsList
                      posts={userPosts}
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
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
