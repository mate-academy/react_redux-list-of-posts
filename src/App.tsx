import React, { useCallback, useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUsers } from './api/users';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as usersActions } from './features/usersSlice';
import { actions as authorActions } from './features/authorSlice';
import { actions as postsActions } from './features/postsSlice';
import { actions as selectedPostActions } from './features/selectedPostSlice';
import { User } from './types/User';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const author = useAppSelector(state => state.author);
  const { posts, loading, hasError } = useAppSelector(state => state.posts);
  const selectedPost = useAppSelector(state => state.selectedPost);

  useEffect(() => {
    getUsers()
      .then(usersFromServer => dispatch(usersActions.set(usersFromServer)));
  }, [dispatch]);

  useEffect(() => {
    dispatch(selectedPostActions.remove());

    if (author) {
      dispatch(postsActions.init(author.id));
    } else {
      dispatch(postsActions.clear());
    }
  }, [author, dispatch]);

  const showLoader = author && loading;
  const showError = author && !loading && hasError;
  const showNoPostsYet = author && !loading && !hasError && posts.length === 0;
  const showPostList = author && !loading && !hasError && posts.length > 0;

  const setAutor = useCallback(
    (currAuthor: User) => dispatch(authorActions.set(currAuthor)),
    [dispatch],
  );

  const setSelectedPost = useCallback(
    (post: Post | null) => dispatch(selectedPostActions.set(post)),
    [dispatch],
  );

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  value={author}
                  onChange={setAutor}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!author && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {showLoader && <Loader />}

                {showError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {showNoPostsYet && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {showPostList && (
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
