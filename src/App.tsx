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
import { initPosts, setSelectedPost } from './features/postsSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const { isLoading, hasError, postList, selectedPost } = useAppSelector(
    st => st.posts,
  );
  const selectedUser = useAppSelector(state => state.users.selectedUser);

  useEffect(() => {
    dispatch(setSelectedPost(null));

    dispatch(initPosts(selectedUser?.id || 0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUser]);

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

                {selectedUser && isLoading && <Loader />}

                {selectedUser && !isLoading && hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {/* eslint-disable @typescript-eslint/indent */}
                {selectedUser &&
                  !isLoading &&
                  !hasError &&
                  postList.length === 0 && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}

                {selectedUser &&
                  !isLoading &&
                  !hasError &&
                  postList.length > 0 && (
                    <PostsList
                      postList={postList}
                      selectedPost={selectedPost}
                    />
                  )}
              </div>
            </div>
          </div>
          {/* eslint-enable @typescript-eslint/indent */}

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
