import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import * as postsActions from './features/postsSlice';
import { selectSelectedPost, setPost } from './features/selectedPostSlice';
import { selectAuthor } from './features/authorSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { posts, status } = useAppSelector(state => state.posts);
  const selectedUser = useAppSelector(selectAuthor);
  const selectedPost = useAppSelector(selectSelectedPost);

  useEffect(() => {
    if (selectedUser) {
      dispatch(postsActions.initUserPosts(selectedUser.id));
      dispatch(setPost(null));
    }
  }, [selectedUser, dispatch]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {selectedUser && status === 'loading' && <Loader />}

                {selectedUser && status === 'failed' && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {selectedUser && status === 'idle' && !posts.length && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {selectedUser && status === 'idle' && posts.length > 0 && (
                  <PostsList />
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
