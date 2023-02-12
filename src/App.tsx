import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { Counter } from './features/counter/Counter';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getUsers } from './api/users';
import * as usersActions from './app/slices/usersSlice';
import * as postsActions from './app/slices/postsSlice';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { author } = useAppSelector(state => state.users);
  const {
    posts, isLoading, error, selectedPost,
  } = useAppSelector(state => state.posts);

  const handleAuthorChange = (selectedAuthor: User) => {
    dispatch(usersActions.setAuthor(selectedAuthor));
  };

  const handlePostSelect = (post: Post | null) => {
    dispatch(postsActions.setSelectedPost(post));
  };

  useEffect(() => {
    getUsers()
      .then(loadedUsers => dispatch(usersActions.setUsers(loadedUsers)));
  }, []);

  useEffect(() => {
    dispatch(postsActions.setSelectedPost(null));

    if (author) {
      dispatch(postsActions.loadUserPosts(author.id));
    }
  }, [author?.id]);

  return (
    <main className="section">
      <Counter />

      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector value={author} onChange={handleAuthorChange} />
              </div>

              <div className="block" data-cy="MainContent">
                {!author && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {author && isLoading && (
                  <Loader />
                )}

                {author && !isLoading && error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author && !isLoading && !error && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && !isLoading && !error && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    selectedPostId={selectedPost?.id}
                    onPostSelected={handlePostSelect}
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
