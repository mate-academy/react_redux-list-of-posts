import React, { useEffect } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { Post } from './types/Post';
import { fetchPosts } from './features/posts/postsThrunk';
import { setAuthor } from './features/author/authorReducer';
import { User } from './types/User';
import { useAppDispatch, useAppSelector } from './app/hooks';
import {
  setSelectedPost,
  clearSelectedPost,
} from './features/selectedPost/selectedPostReducer';
import { fetchUsers } from './features/users/usersSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    items: posts,
    loaded,
    hasError,
  } = useAppSelector(state => state.posts);
  const author = useAppSelector(state => state.author) as User | null;

  const selectedPost = useAppSelector(
    state => state.selectedPost,
  ) as Post | null;

  useEffect(() => {
    dispatch(clearSelectedPost(undefined));
    if (author?.id) {
      dispatch(fetchPosts(author.id));
    }
  }, [author, dispatch]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleAuthorChange = (user: User | null) => {
    dispatch(setAuthor(user));
  };

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
                      if (post) {
                        dispatch(setSelectedPost(post));
                      } else {
                        dispatch(clearSelectedPost(undefined));
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
