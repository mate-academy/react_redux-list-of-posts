import classNames from 'classnames';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import './App.scss';

import { AppDispatch } from './app/store';
import { Loader } from './components/Loader';
import { PostDetails } from './components/PostDetails';
import { PostsList } from './components/PostsList';
import { UserSelector } from './components/UserSelector';

import {
  clearAuthor,
  selectAuthor,
  setAuthor,
} from './features/author/authorSlice';

import {
  fetchPosts,
  selectPosts,
  selectPostsError,
  selectPostsLoaded,
} from './features/posts/postsSlice';

import {
  clearSelectedPost,
  selectPost,
  selectSelectedPost,
} from './features/posts/selectedPostSlice';

import { User } from './types/User';

export const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const author = useSelector(selectAuthor);
  const posts = useSelector(selectPosts);
  const loaded = useSelector(selectPostsLoaded);
  const hasError = useSelector(selectPostsError);
  const selectedPost = useSelector(selectSelectedPost);

  const handleAuthorChange = (user: User | null) => {
    if (user) {
      dispatch(setAuthor(user));
      dispatch(clearSelectedPost());
      dispatch(fetchPosts(user.id));
    } else {
      dispatch(clearAuthor());
      dispatch(clearSelectedPost());
    }
  };

  useEffect(() => {
    dispatch(clearAuthor());
    dispatch(clearSelectedPost());
  }, [dispatch]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector value={author} onChange={handleAuthorChange} />
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
                    onPostSelected={post => {
                      if (!post) {
                        dispatch(clearSelectedPost());

                        return;
                      }

                      if (selectedPost?.id === post.id) {
                        dispatch(clearSelectedPost());
                      } else {
                        dispatch(selectPost(post));
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
