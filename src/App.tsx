import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { fetchUsers } from './features/users/usersSlice';
import {
  selectSelectedAuthor,
  setSelectedAuthor,
} from './features/author/authorSlice';
import {
  fetchUserPosts,
  clearPosts,
  selectPosts,
} from './features/posts/postsSlice';
import {
  selectSelectedPost,
  setSelectedPost,
} from './features/selectedPost/selectedPostSlice';
import { clearComments } from './features/comments/commentsSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const author = useAppSelector(selectSelectedAuthor);
  const posts = useAppSelector(selectPosts);
  const selectedPost = useAppSelector(selectSelectedPost);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setSelectedPost(null));
    dispatch(clearComments());

    if (author) {
      dispatch(fetchUserPosts(author.id));
    } else {
      dispatch(clearPosts());
    }
  }, [author, dispatch]);

  const showNoPostsYet =
    author && posts.loaded && !posts.hasError && posts.items.length === 0;

  const showPostsList =
    author && posts.loaded && !posts.hasError && posts.items.length > 0;

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  value={author}
                  onChange={user => dispatch(setSelectedAuthor(user))}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!author && <p data-cy="NoSelectedUser">No user selected</p>}

                {author && !posts.loaded && <Loader />}

                {author && posts.loaded && posts.hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {showNoPostsYet && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {showPostsList && (
                  <PostsList
                    posts={posts.items}
                    selectedPostId={selectedPost?.id}
                    onPostSelected={post => {
                      dispatch(setSelectedPost(post));
                      if (!post) {
                        dispatch(clearComments());
                      }
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
