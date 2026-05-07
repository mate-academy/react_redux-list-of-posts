import React, { useCallback, useEffect } from 'react';
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
import { fetchUsers } from './features/users';
import { authorSlice } from './features/author';
import { fetchPosts, postsSlice } from './features/posts';
import { selectedPostSlice } from './features/selectedPost';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users, author, posts, selectedPost } = useAppSelector(state => state);
  const { items, loaded, hasError } = posts;

  function setUser(value: User) {
    dispatch(authorSlice.actions.setAuthor(value));
  }

  const setSelectedPost = useCallback(
    (value: Post | null) => {
      dispatch(selectedPostSlice.actions.setPost(value));
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    setSelectedPost(null);

    if (author) {
      dispatch(fetchPosts(author.id));
    } else {
      dispatch(postsSlice.actions.clearPosts());
    }
  }, [author, dispatch, setSelectedPost]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector users={users} value={author} onChange={setUser} />
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

                {author && loaded && !hasError && items.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && loaded && !hasError && items.length > 0 && (
                  <PostsList
                    posts={items}
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
