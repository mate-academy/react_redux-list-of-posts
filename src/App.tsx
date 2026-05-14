import React, { useEffect } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUserPosts } from './api/posts';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getUsers } from './api/users';
import { setUsers } from './features/users/usersSlice';
import { setAuthor } from './features/author/authorSlice';
import {
  loadingFailed,
  postsLoaded,
  startLoading,
} from './features/posts/postsSlice';
import { setSelectedPost } from './features/selectedPost/selectedPostSlice';
import { clearComments } from './features/comments/commentsSlice';

export const App: React.FC = () => {
  const author = useAppSelector(state => state.author);
  const posts = useAppSelector(state => state.posts.items);
  const loaded = useAppSelector(state => state.posts.loaded);
  const hasError = useAppSelector(state => state.posts.hasError);
  const selectedPost = useAppSelector(state => state.selectedPost);

  const dispatch = useAppDispatch();

  useEffect(() => {
    getUsers().then(allUsers => {
      dispatch(setUsers(allUsers));
    });
  }, [dispatch]);

  function loadUserPosts(userId: number) {
    dispatch(startLoading());

    getUserPosts(userId)
      .then(p => dispatch(postsLoaded(p)))
      .catch(() => dispatch(loadingFailed()));
  }

  useEffect(() => {
    // we clear the post when an author is changed
    // not to confuse the user
    dispatch(setSelectedPost(null));
    dispatch(clearComments());

    if (author) {
      loadUserPosts(author.id);
    }
  }, [author]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  value={author}
                  onChange={user => dispatch(setAuthor(user))}
                />
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
                    openPostId={selectedPost?.id}
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
              'is-8-desktop',
              'Sidebar',
              {
                'Sidebar--open': !!selectedPost,
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
