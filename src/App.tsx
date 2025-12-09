import React, { useMemo } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { Post } from './types/Post';
import { useAppDispatch, useAppSelector } from './app/hooks';
import {
  loadPostsByUser,
  selectAuthor,
  selectPosts,
  selectPostsError,
  selectPostsLoading,
  selectSelectedPostId,
  setAuthor,
  setSelectedPostId,
} from './features/postsSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const author = useAppSelector(selectAuthor);
  const posts = useAppSelector(selectPosts);
  const hasError = useAppSelector(selectPostsError);
  const loading = useAppSelector(selectPostsLoading);
  const selectedPostId = useAppSelector(selectSelectedPostId);

  const selectedPost: Post | null = useMemo(
    () => posts.find(post => post.id === selectedPostId) || null,
    [posts, selectedPostId],
  );

  const handleAuthorChange = (user: User) => {
    dispatch(setAuthor(user));
    dispatch(loadPostsByUser(user.id));
  };

  const handlePostSelected = (post: Post | null) => {
    dispatch(setSelectedPostId(post ? post.id : null));
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector value={author} onChange={handleAuthorChange} />
              </div>

              <div className="block" data-cy="MainContent">
                {!author && <p data-cy="NoSelectedUser">No user selected</p>}

                {author && loading && <Loader />}

                {author && !loading && hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author && !loading && !hasError && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && !loading && !hasError && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    selectedPostId={selectedPost?.id}
                    onPostSelected={handlePostSelected}
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
