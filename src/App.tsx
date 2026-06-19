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
import { loadUsers } from './features/users/usersSlice';
import { loadPosts, clearPosts } from './features/posts/postsSlice';
import { setSelectedPost } from './features/selectedPost/selectedPostSlice';
import { clearComments } from './features/comments/commentsSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const author = useAppSelector(state => state.author);
  const posts = useAppSelector(state => state.posts);
  const selectedPost = useAppSelector(state => state.selectedPost);

  const hasPosts =
    author && posts.loaded && !posts.hasError && posts.items.length > 0;

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setSelectedPost(null));
    dispatch(clearComments());

    if (author) {
      dispatch(loadPosts(author.id));
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

                {author && !posts.loaded && <Loader />}

                {author && posts.loaded && posts.hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {!hasPosts && author && posts.loaded && !posts.hasError && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {hasPosts && (
                  <PostsList
                    posts={posts.items}
                    selectedPostId={selectedPost?.id ?? null}
                    onSelectPost={post => dispatch(setSelectedPost(post))}
                  />
                )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={classNames('tile is-parent is-8-desktop Sidebar', {
              'Sidebar--open': Boolean(selectedPost),
            })}
          >
            <div className="tile is-child box is-success">
              {selectedPost ? (
                <PostDetails post={selectedPost} />
              ) : (
                <p data-cy="NoSelectedPost">Choose a post</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
