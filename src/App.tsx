import React, { useEffect } from 'react';
import cn from 'classnames';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { useAppDispatch, useAppSelector } from './app/hooks';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUserPosts } from './api/posts';
import * as postActions from './features/postsSlice';
import * as selectedPostActions from './features/selectedPostSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const author = useAppSelector(state => state.author.author);
  const selectedPost = useAppSelector(state => state.selectedPost.selectedPost);

  const posts = useAppSelector(state => state.posts.items);
  const loaded = useAppSelector(state => state.posts.loaded);
  const hasError = useAppSelector(state => state.posts.hasError);

  function loadUserPosts(userId: number) {
    dispatch(postActions.setLoadedFalse());

    getUserPosts(userId)
      .then((data) => dispatch(postActions.setPosts(data)))
      .catch(() => dispatch(postActions.setHasError()))
      .finally(() => dispatch(postActions.setLoadedTrue()));
  }

  useEffect(() => {
    dispatch(selectedPostActions.resetSelectedPost());

    if (author) {
      loadUserPosts(author.id);
    } else {
      dispatch(postActions.clearPosts());
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
                />
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
                  <PostsList
                    posts={posts}
                  />
                )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={cn(
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
