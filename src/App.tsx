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
import { setSelectedPost } from './app/features/selected/selectedPostSlice';
import { clearPosts, fetchPostByUser } from './app/features/posts/postsSlice';
import { featchUsers } from './app/features/users/usersSlice';

export const App: React.FC = () => {
  const {
    items: posts,
    loaded,
    hasError,
  } = useAppSelector(state => state.posts);

  const author = useAppSelector(state => state.author);
  const selectedPost = useAppSelector(state => state.selectedPost);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(featchUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setSelectedPost(null));

    if (author) {
      dispatch(fetchPostByUser(author.id));
    } else {
      dispatch(clearPosts());
    }
  }, [dispatch, author]);

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
                    onPostSelected={post => dispatch(setSelectedPost(post))}
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
              'is-4-desktop',
              'Sidebar',
              {
                'Sidebar--open': selectedPost,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {!selectedPost && (
                <p className="title" data-cy="NoSelectedPost">
                  Choose a post
                </p>
              )}
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
