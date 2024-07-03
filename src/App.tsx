import React, { useEffect, useState } from 'react';
import * as usersActions from './features/users';
import * as postsActions from './features/posts';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { Post } from './types/Post';
import { useAppDispatch, useAppSelector } from './app/hooks';

export const App: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const dispatch = useAppDispatch();
  const author = useAppSelector(state => state.author);
  const { isUsersLoading } = useAppSelector(state => state.users);
  const { posts, postsError, isPostsLoading } = useAppSelector(
    state => state.posts,
  );
  const clearPosts = () =>
    dispatch(postsActions.postsSlice.actions.clearPosts());

  useEffect(() => {
    dispatch(usersActions.init());
  }, []);

  useEffect(() => {
    setSelectedPost(null);

    if (author) {
      dispatch(postsActions.init(author.id));
    } else {
      clearPosts();
    }
  }, [author]);

  if (isUsersLoading) {
    return <Loader />;
  }

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
                {!author && <p data-cy="NoSelectedUser">No user selected</p>}

                {author && isPostsLoading && <Loader />}

                {author && !isPostsLoading && postsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author &&
                  !isPostsLoading &&
                  !postsError &&
                  posts.length === 0 && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}

                {author &&
                  !isPostsLoading &&
                  !postsError &&
                  posts.length > 0 && (
                    <PostsList
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
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
