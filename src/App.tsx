import React, { useEffect } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import { useAppDispatch } from './app/hooks';
import { useAppSelector } from './app/hooks';
import { fetchUsers } from './features/users/usersSlice';
import { fetchPosts } from './features/posts/postsSlice';
import { setAuthor } from './features/author/authorSlice';
import { clearPosts } from './features/posts/postsSlice';
import { setPost } from './features/selectedPost/selectedPostSlice';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const author = useAppSelector(state => state.author);
  const post = useAppSelector(state => state.post);
  const selectedPost = useAppSelector(state => state.selectedPost);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setPost(null));

    if (author) {
      dispatch(fetchPosts(author.id));
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
                <UserSelector
                  value={author}
                  onChange={user => dispatch(setAuthor(user))}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!author && <p data-cy="NoSelectedUser">No user selected</p>}

                {author && !post.loaded && <Loader />}

                {author && post.loaded && post.hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}
                {/* eslint-disable @typescript-eslint/indent */}
                {author &&
                  post.loaded &&
                  !post.hasError &&
                  post.items.length === 0 && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}

                {author &&
                  post.loaded &&
                  !post.hasError &&
                  post.items.length > 0 && (
                    <PostsList
                      posts={post.items}
                      selectedPostId={selectedPost?.id}
                      onPostSelected={selected => dispatch(setPost(selected))}
                    />
                  )}
                {/* eslint-enable @typescript-eslint/indent */}
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
              {selectedPost ? (
                <PostDetails post={selectedPost} />
              ) : (
                <p>Choose a Post</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
