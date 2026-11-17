/* eslint-disable @typescript-eslint/indent */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { Post } from './types/Post';
import { loadUsers } from './app/usersSlice';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { loadPosts } from './app/postsSlice';

export const App: React.FC = () => {
  const [author, setAuthor] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    // we clear the post when an author is changed
    // not to confuse the user
    setSelectedPost(null);

    if (author) {
      dispatch(loadPosts(author.id));
    }
  }, [author, dispatch]);

  const {
    items: posts,
    loading: postsLoading,
    hasError: postsHasError,
  } = useAppSelector(state => state.posts);

  const { loading: userLoading } = useAppSelector(state => state.users);

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector value={author} onChange={setAuthor} />
              </div>

              <div className="block" data-cy="MainContent">
                {!author && <p data-cy="NoSelectedUser">No user selected</p>}

                {author && postsLoading && <Loader />}

                {author && !postsLoading && postsHasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author &&
                  !userLoading &&
                  !postsLoading &&
                  !postsHasError &&
                  posts.length === 0 && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}
                {author &&
                  !postsLoading &&
                  !postsHasError &&
                  posts.length > 0 && (
                    <PostsList
                      posts={posts}
                      selectedPostId={selectedPost?.id}
                      onPostSelected={setSelectedPost}
                    />
                  )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={classNames('tile', 'is-parent', 'is-8-desktop', {
              'Sidebar--open': selectedPost !== null,
            })}
          >
            <div className="tile is-child box is-success ">
              <PostDetails post={selectedPost} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
