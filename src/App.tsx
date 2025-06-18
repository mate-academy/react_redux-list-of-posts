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
import { setAuthor } from './app/reducers/authorSlice';
import { RootState } from './app/store';
import { clearPosts, fetchPostByUser } from './app/reducers/postsSlice';
import {
  clearSelectedPost,
  setSelectedPost,
} from './app/reducers/selectedPostSlice';
import { loadUsers } from './app/reducers/usersSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const author = useAppSelector((state: RootState) => state.author.user);
  const posts = useAppSelector((state: RootState) => state.posts.items);
  const loaded = useAppSelector((state: RootState) => state.posts.loaded);
  const hasError = useAppSelector((state: RootState) => state.posts.hasError);
  const selectedPost = useAppSelector(
    (state: RootState) => state.selectedPost.post,
  );

  useEffect(() => {
    dispatch(clearSelectedPost());
    dispatch(clearPosts());
    dispatch(loadUsers());

    if (author) {
      dispatch(fetchPostByUser(author.id));
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
