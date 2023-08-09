import React from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { Post } from './types/Post';
// import { Counter } from './features/counter/Counter';
import { useAppDispatch, useAppSelector } from './app/hooks';
import * as selectedPostActions from './features/SelectedPost/SelectedPost';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.currentUser);
  const { posts, loading, error } = useAppSelector(state => state.userPosts);
  const { post } = useAppSelector(state => state.selectedPost);

  const setSelectedPost = (item: Post | null) => {
    dispatch(selectedPostActions.add(item));
  };

  return (
    <main className="section">
      {/* Learn the Redux Toolkit usage example in src/app and src/features/counter */}
      {/* <Counter /> */}

      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector />
              </div>

              <div className="block" data-cy="MainContent">
                {!user && !loading && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {loading && (
                  <Loader />
                )}

                {user && !loading && error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {user && !loading && !error && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {user && !loading && !error && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    selectedPostId={post?.id}
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
                'Sidebar--open': post,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {post && (
                <PostDetails post={post} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
