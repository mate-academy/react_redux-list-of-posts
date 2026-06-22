import React, { useEffect } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchUsers } from './features/users/usersSlice';
import { setAuthor } from './features/author/authorSlice';
import { fetchPosts } from './features/posts/postsSlice';
import { setSelectedPost } from './features/selectedPost/selectedPostSlice';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  // Get authorId from Redux
  const authorId = useAppSelector(state => state.author);
  const users = useAppSelector(state => state.users);

  // Get posts state from Redux
  const {
    items: posts,
    loaded,
    hasError,
  } = useAppSelector(state => state.posts);

  // Get selectedPostId from Redux
  const selectedPostId = useAppSelector(state => state.selectedPost);

  // Find the full User object based on authorId
  const author = users.find(user => user.id === authorId) || null;

  // Find the full Post object based on selectedPostId
  const selectedPost = posts.find(post => post.id === selectedPostId) || null;

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    // we clear the post when an author is changed
    // not to confuse the user
    dispatch(setSelectedPost(null));

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
                  onChange={user => dispatch(setAuthor(user.id))}
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
                    onPostSelected={postId => dispatch(setSelectedPost(postId))}
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
