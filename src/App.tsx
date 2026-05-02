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
import { loadUsers } from './features/Task/users';
import { loadingPosts, clearPosts } from './features/Task/posts';
import { setPost } from './features/Task/selectedPost';
import { User } from './types/User';
import { Post } from './types/Post';
import { setAuthor } from './features/Task/author';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const { loadedUsers } = useAppSelector(state => state.users);
  const {
    items: posts,
    loaded: isLoadingPost,
    hasError: isErrorPost,
  } = useAppSelector(state => state.posts);
  const selectedPost = useAppSelector(state => state.selectedPost);
  const author = useAppSelector(state => state.author);

  useEffect(() => {
    if (loadedUsers.length < 1) {
      dispatch(loadUsers());
    }
  }, [dispatch, loadedUsers.length]);

  useEffect(() => {
    dispatch(setPost(null));

    if (author) {
      dispatch(clearPosts());
      dispatch(loadingPosts(author.id));
    } else {
      dispatch(clearPosts());
    }
  }, [author, dispatch]);

  const handleUserChange = (user: User) => {
    dispatch(setAuthor(user));
  };

  const handlePostSelected = (post: Post | null) => {
    dispatch(setPost(post));
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={loadedUsers}
                  value={author}
                  onChange={handleUserChange}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!author && <p data-cy="NoSelectedUser">No user selected</p>}

                {author && isLoadingPost && <Loader />}

                {author && !isLoadingPost && isErrorPost && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author &&
                  !isLoadingPost &&
                  !isErrorPost &&
                  posts.length === 0 && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}

                {author &&
                  !isLoadingPost &&
                  !isErrorPost &&
                  posts.length > 0 && (
                    <PostsList
                      posts={posts}
                      selectedPostId={selectedPost?.id}
                      onPostSelected={handlePostSelected}
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
              { 'Sidebar--open': !!selectedPost },
            )}
          >
            <div className="tile is-child box is-success">
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
