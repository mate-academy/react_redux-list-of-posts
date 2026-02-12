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
import { fetchUsers, selectUsersLoaded } from './features/users/usersSlice';
import {
  fetchPosts,
  selectPosts,
  selectPostsError,
  selectPostsLoaded,
} from './features/posts/postsSlice';

import { selectAuthor, setAuthor } from './features/athor/athorSlice';
import {
  selectSelectedPostId,
  setSelectedPost,
} from './features/selectedPosts/selectedPostsSlice';

export const App: React.FC = () => {
  const author = useAppSelector(selectAuthor);

  const posts = useAppSelector(selectPosts);
  const loaded = useAppSelector(selectPostsLoaded);
  const hasError = useAppSelector(selectPostsError);

  const selectedPostId = useAppSelector(selectSelectedPostId);
  const usersLoaded = useAppSelector(selectUsersLoaded);

  const dispatch = useAppDispatch();

  const selectedPost = posts.find(post => post.id === selectedPostId);

  if (!usersLoaded) {
    dispatch(fetchUsers());
  }

  useEffect(() => {
    if (author) {
      dispatch(fetchPosts(author.id));
    }
  }, [author, dispatch]);

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
                    selectedPostId={selectedPostId}
                    onPostSelected={post => {
                      dispatch(setSelectedPost(post ? post.id : null));
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
            <div className="tile is-child box is-success ">
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
