import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
// import { Counter } from './features/counter/Counter';
import { useAppDispatch, useAppSelector } from './app/hooks';
import * as usersActions from './features/usersSlice';
import * as postsActions from './features/postsSlice';
import * as selectedPostActions from './features/selectedPostSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { hasError: usersError } = useAppSelector(state => state.users);
  const { author } = useAppSelector(state => state.author);
  const { posts, hasError, loaded } = useAppSelector(state => state.posts);
  const { selectedPost } = useAppSelector(state => state.selectedPost);

  useEffect(() => {
    dispatch(usersActions.fetchUsers());
  }, []);

  function loadUserPosts(userId: number) {
    dispatch(postsActions.fetchPosts(userId));
  }

  useEffect(() => {
    dispatch(selectedPostActions.setSelectedPost(null));

    if (author) {
      loadUserPosts(author.id);
    } else {
      dispatch(postsActions.setPosts([]));
    }
  }, [author?.id]);

  return (
    <main className="section">
      {/* <Counter /> */}

      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">

                {!usersError && (<UserSelector />)}

                {usersError && (
                  <p className="notification is-danger"> Something wrong!</p>
                )}
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
                  <PostsList />)}
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
                // 'Sidebar--open': selectedPost,
                'Sidebar--open': true,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost?.id ? (
                <PostDetails post={selectedPost} />
              ) : 'Choose a post'}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
