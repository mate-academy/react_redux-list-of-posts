import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { User } from './types/User';
import { Post } from './types/Post';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

import { useAppSelector, useAppDispatch } from './app/hooks';
import { selectPostsState, fetchUserPosts } from './features/posts/postsSlice';
import { fetchUsers } from './features/users/usersSlice';
import { selectAuthor, setAuthor } from './features/author/authorSlice';
import {
  selectSelectedPost,
  setPost,
} from './features/selectedPost/selectedPostSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const { posts, loaded, hasError } = useAppSelector(selectPostsState);
  const author = useAppSelector(selectAuthor);
  const selectedPost = useAppSelector(selectSelectedPost);

  const setUsers = () => dispatch(fetchUsers());
  const setSelectedPost = (post: Post | null) => dispatch(setPost(post));
  const setNewAuthor = (newAuthor: User) => {
    setSelectedPost(null);

    return dispatch(setAuthor(newAuthor));
  };

  const loadUserPosts = () => {
    if (author) {
      dispatch(fetchUserPosts(author.id));
    }
  };

  useEffect(() => {
    loadUserPosts();
  }, [author?.id]);

  useEffect(() => {
    setUsers();
  }, []);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector value={author} onChange={setNewAuthor} />
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
                    onPostSelected={setSelectedPost}
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
