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
import { initUsers } from './features/users';
import { initPosts, clearPosts } from './features/posts';
import { setSelectedPost } from './features/selectedPost';
import { clearComments } from './features/comments';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const author = useAppSelector(state => state.author);
  const {
    items: posts,
    loaded,
    hasError,
  } = useAppSelector(state => state.posts);
  const selectedPost = useAppSelector(state => state.selectedPost);

  useEffect(() => {
    dispatch(initUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setSelectedPost(null));
    dispatch(clearComments());

    if (author) {
      dispatch(initPosts(author.id));
    } else {
      dispatch(clearPosts());
    }
  }, [author, dispatch]);

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
                    onPostSelected={post => {
                      dispatch(setSelectedPost(post));
                    }}
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
            <div className="tile is-child box is-success">
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
