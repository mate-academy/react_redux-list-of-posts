import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { Post } from './types/Post';
import { User } from './types/User';
// import { Counter } from './features/counter/Counter';
import { actions as usersActions } from './features/users/usersSlice';
import { getUsers } from './api/users';
import { useAppDispatch, useAppSelector } from './app/hooks';
import * as authorActions from './features/author/authorSlice';
import * as postsActions from './features/posts/postsSlice';
import * as postActions from './features/post/postSlice';

export const App: React.FC = () => {
  const author = useAppSelector(authorActions.selectedAuthor);
  const posts = useAppSelector(postsActions.selectedPosts);
  const selectedPost = useAppSelector(postActions.selectedPost);
  const status = useAppSelector(state => state.posts.status);
  const dispatch = useAppDispatch();

  const setAuthor = (user: User) => {
    dispatch(authorActions.setAuthor(user));
  };

  const setSelectedPost = (post: Post | null) => {
    dispatch(postActions.setPost(post));
  };

  const loadUsers = async () => {
    const usersFromServer = await getUsers();

    dispatch(usersActions.setUsers(usersFromServer));
  };

  function loadUserPosts(userId: number) {
    dispatch(postsActions.incrementAsync(userId));
  }

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    setSelectedPost(null);

    if (author) {
      loadUserPosts(author.id);
    }
  }, [author?.id]);

  const loading = status === 'loading';
  const hasError = status === 'failed';

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
                {!author && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {author && loading && (
                  <Loader />
                )}

                {author && !loading && hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author && !loading && !hasError && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && !loading && !hasError && posts.length > 0 && (
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
              {selectedPost && (
                <PostDetails post={selectedPost} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
