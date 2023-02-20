import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import * as usersActions from './features/users/usersSlice';
import * as postsActions from './features/posts/postsSlice';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getUsers } from './api/users';

export const App: React.FC = () => {
  const {
    error: hasError,
    isLoading: loaded,
    posts,
    selectedPost,
  } = useAppSelector(state => state.posts);

  const dispatch = useAppDispatch();

  const { author } = useAppSelector(state => state.users);

  useEffect(() => {
    getUsers()
      .then(usersFromServer => {
        dispatch(usersActions.setUsers(usersFromServer));
      });
  }, []);

  useEffect(() => {
    dispatch(postsActions.setSelectedPost(null));

    if (author) {
      dispatch(postsActions.downloadUsersPosts(author.id));
    }
  }, [author?.id]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  value={author}
                  onChange={
                    (newAuthor) => dispatch(usersActions.setAuthor(newAuthor))
                  }
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!author && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {author && loaded && (
                  <Loader />
                )}

                {author && !loaded && hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author && !loaded && !hasError && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && !loaded && !hasError && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    selectedPostId={selectedPost?.id}
                    onPostSelected={
                      (newSelectedPost) => dispatch(
                        postsActions.setSelectedPost(newSelectedPost),
                      )
                    }
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
