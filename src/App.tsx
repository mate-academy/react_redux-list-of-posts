import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { useAppDispatch, useAppSelector } from './app/hooks';
import * as postsActions from './features/postsSlice';
import { actions as selectedActions } from './features/selectedPostSlice';
import { getUsers } from './api/users';
import { actions as usersActions } from './features/usersSlice.ts';

export const App: React.FC = () => {
  const [author, setAuthor] = useState<User | null>(null);

  const dispatch = useAppDispatch();
  const {
    items: posts,
    loaded,
    hasError,
  } = useAppSelector(state => state.posts);

  const selectedPost = useAppSelector(state => state.selectedPost);

  useEffect(() => {
    // we clear the post when an author is changed
    // not to confuse the user
    dispatch(selectedActions.set(null));

    getUsers().then(usersFromServer => {
      dispatch(usersActions.set(usersFromServer));
    });

    if (author) {
      dispatch(postsActions.userPosts(author.id));
    } else {
      dispatch(postsActions.setPosts([]));
    }
  }, [author, dispatch]);

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

                {author && !loaded && <Loader />}

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
                    onPostSelected={post => dispatch(selectedActions.set(post))}
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
