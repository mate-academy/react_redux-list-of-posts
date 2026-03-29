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
import { selectUsers } from './features/users/usersSlice';
import {
  selectPosts,
  selectPostsError,
  selectPostsLoading,
  fetchUserPosts,
  setItems,
} from './features/posts/postsSlice';
import { setAuthorId, selectAuthorId } from './features/author/authorSlice';
import {
  setPostId,
  selectSelectedPostId,
} from './features/selectedPost/selectedPostSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const posts = useAppSelector(selectPosts);
  const loading = useAppSelector(selectPostsLoading);
  const error = useAppSelector(selectPostsError);

  const selectedUserId = useAppSelector(selectAuthorId);
  const selectedPostId = useAppSelector(selectSelectedPostId);

  const author = useAppSelector(state => {
    return selectUsers(state).find(user => user.id === selectedUserId) || null;
  });

  const selectedPost = useAppSelector(state => {
    return selectPosts(state).find(post => post.id === selectedPostId) || null;
  });

  useEffect(() => {
    dispatch(setPostId(null));

    if (selectedUserId) {
      dispatch(fetchUserPosts(selectedUserId));
    } else {
      dispatch(setItems([]));
    }
  }, [selectedUserId, dispatch]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  value={author}
                  onChange={u => dispatch(setAuthorId(u.id))}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!author && <p data-cy="NoSelectedUser">No user selected</p>}

                {author && loading && <Loader />}

                {author && !loading && error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author && !loading && !error && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && !loading && !error && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    selectedPostId={selectedPostId ?? undefined}
                    onPostSelected={p => dispatch(setPostId(p ? p.id : null))}
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
              { 'Sidebar--open': !!selectedPost },
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
