import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './features/posts/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './features/users/UserSelector';
import { Loader } from './components/Loader';
import { Counter } from './features/counter/Counter';
import { useAppDispatch, useAppSelector } from './app/hooks';
import * as postsActions from './features/posts/postsSlice';
import * as selectedPostActions
  from './features/selectedPost/selectedPostSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    posts,
    isPostsLoaded,
    hasPostsError,
  } = useAppSelector(state => state.posts);

  const { author } = useAppSelector(state => state.author);
  const { selectedPost } = useAppSelector(state => state.selectedPost);

  useEffect(() => {
    // we clear the post when an author is changed
    // not to confuse the user
    dispatch(selectedPostActions.setPost(null));

    if (author) {
      dispatch(postsActions.postsInit(author.id));
    } else {
      dispatch(postsActions.setPosts([]));
    }
  }, [author, dispatch]);

  return (
    <main className="section">
      {/* Learn the Redux Toolkit usage example in src/app and src/features/counter */}
      <Counter />

      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector value={author} />
              </div>

              <div className="block" data-cy="MainContent">
                {!author && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {author && !isPostsLoaded && (
                  <Loader />
                )}

                {author && isPostsLoaded && hasPostsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author
                  && isPostsLoaded
                  && !hasPostsError
                  && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author
                && isPostsLoaded
                && !hasPostsError
                && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    selectedPostId={selectedPost?.id}
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
