import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import classNames from 'classnames';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

import { useAppDispatch, useAppSelector } from './app/hooks';
import { setAuthor } from './features/users/usersSlice';
import {
  fetchPosts,
  setPosts,
  setSelectedPost,
} from './features/posts/postsSlice';

import { User } from './types/User';
import { Post } from './types/Post';

import './App.scss';

export const App: React.FC = () => {
  const { posts, selectedPost, isLoading, error } = useAppSelector(
    state => state.posts,
  );
  const { author } = useAppSelector(state => state.users);
  const dispatch = useAppDispatch();

  const handleSetAuthor = (authorVal: User) => {
    dispatch(setAuthor(authorVal));
  };

  const loadUserPosts = (userId: number) => {
    dispatch(fetchPosts(userId));
  };

  const handleSetSelectedPost = (value: Post | null) => {
    dispatch(setSelectedPost(value));
  };

  useEffect(() => {
    dispatch(setSelectedPost(null));

    if (author) {
      loadUserPosts(author.id);
    } else {
      dispatch(setPosts([]));
    }
  }, [author, dispatch]);

  const canShowPost = author && isLoading && !error;

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector value={author} onChange={handleSetAuthor} />
              </div>

              <div className="block" data-cy="MainContent">
                {!author && <p data-cy="NoSelectedUser">No user selected</p>}
                {author && !isLoading && <Loader />}
                {author && isLoading && error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}
                {canShowPost && !posts.length && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}
                {canShowPost && !!posts.length && (
                  <PostsList
                    posts={posts}
                    selectedPostId={selectedPost?.id}
                    onPostSelected={handleSetSelectedPost}
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
