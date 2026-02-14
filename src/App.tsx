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
import { userInit } from './features/users';
import { init } from './features/posts';
import { userPostsInit } from './features/currentUser';
import { postCommentsInit } from './features/currentPost';
import { actions as currentPostActions } from './features/currentPost';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentUser, userPostsLoading, currentUserPosts } = useAppSelector(state => state.currentUser);
  const { currentPost, currentPostError } = useAppSelector(state => state.currentPost);
  const { userLoading } = useAppSelector(state => state.users);

  const setCurrentPost = (post: Post | null) => dispatch(currentPostActions.setCurrentPost(post));


  useEffect(() => {
    dispatch(userInit());
    dispatch(init());
    if(currentUser) {
      dispatch(userPostsInit(currentUser.id));
    };
    setCurrentPost(null);
  }, [currentUser]);

  useEffect(() => {
    if(currentPost) {
      dispatch(postCommentsInit(currentPost.id))
    }
  }, [currentPost])

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
                {!currentUser && <p data-cy="NoSelectedUser">No user selected</p>}

                {currentUser && userLoading && <Loader />}

                {currentUser && !userLoading && currentPostError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {currentUser && !userPostsLoading && !currentPostError && currentUserPosts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {currentUser && !userPostsLoading && currentUserPosts.length > 0  && (
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
                'Sidebar--open': currentPost,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {currentPost && <PostDetails post={currentPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
