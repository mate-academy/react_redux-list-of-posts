/* eslint-disable max-len */
import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from './app/hooks';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { fetchUsers } from './features/counter/users/usersSlice';
import { clearPosts, fetchPosts } from './features/counter/posts/postsSlice';
import { setSelectedPost } from './features/counter/selectedPost/selectedPostSlice';
import { setAuthor } from './features/counter/author/authorSlice';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  // const { items: users, loaded: usersLoaded } = useAppSelector(s => s.users);
  const author = useAppSelector(s => s.author.current);
  const {
    items: posts,
    loaded: postsLoaded,
    hasError: postsError,
  } = useAppSelector(s => s.posts);
  const selectedPost = useAppSelector(s => s.selectedPost.post);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (author) {
      dispatch(fetchPosts(author.id));
      dispatch(setSelectedPost(null));
    } else {
      dispatch(clearPosts());
      dispatch(setSelectedPost(null));
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

                {author && !postsLoaded && <Loader />}

                {author && postsLoaded && postsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author && postsLoaded && !postsError && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && postsLoaded && !postsError && posts.length > 0 && (
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
              { 'Sidebar--open': selectedPost },
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
