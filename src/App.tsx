import React, { useEffect } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

import { useSelector } from 'react-redux';
import type { RootState } from './app/store';

import { setAuthor } from './features/author/authorSlice';
import { fetchPostsByUser, clearPosts } from './features/posts/postsSlice';
import {
  selectPost,
  clearSelectedPost,
} from './features/selectedPost/selectedPostSlice';
import { useAppDispatch } from './app/hooks';
import { loadUsers } from './features/users/usersSlice';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const author = useSelector((state: RootState) => state.author.user);
  const posts = useSelector((state: RootState) => state.posts.items);
  const loaded = useSelector((state: RootState) => state.posts.loaded);
  const hasError = useSelector((state: RootState) => state.posts.hasError);
  const selectedPost = useSelector(
    (state: RootState) => state.selectedPost.post,
  );

  useEffect(() => {
    dispatch(clearSelectedPost());
    dispatch(clearPosts());
    dispatch(loadUsers());

    if (author) {
      dispatch(fetchPostsByUser(author.id));
    }
  }, [author, dispatch]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block"></div>

              <UserSelector
                value={author}
                onChange={user => dispatch(setAuthor(user))}
              />

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
                    onPostSelected={post => dispatch(selectPost(post))}
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

export default App;
