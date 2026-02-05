import React, { useEffect } from 'react';
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
import { useAppDispatch, useAppSelector } from './app/hooks';
import { authorSlice } from './features/AuthorSlice';
import { usersSlice } from './features/UsersSlice';
import { postsSlice } from './features/PostsSlice';
import { selectedPostSlice } from './features/SelectedPost';

export const App: React.FC = () => {
  const author = useAppSelector(state => state.author.user);
  const {
    items: posts,
    hasError,
    loaded,
  } = useAppSelector(state => state.posts);
  const selectedPost = useAppSelector(state => state.selectedPost);
  const dispatch = useAppDispatch();

  const setAuthor = (user: User | null) => {
    dispatch(authorSlice.actions.set(user));
  };

  const selectUser = (post: Post | null) => {
    if (!post) {
      return dispatch(selectedPostSlice.actions.clean());
    }

    return dispatch(selectedPostSlice.actions.set(post));
  };

  useEffect(() => {
    dispatch(usersSlice.actions.loadUsers());
  }, [dispatch]);

  useEffect(() => {
    // we clear the post when an author is changed
    // not to confuse the user
    dispatch(selectedPostSlice.actions.clean());

    if (author) {
      dispatch(postsSlice.actions.loadAuthorPosts(author.id));
    }
  }, [author, dispatch]);

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

                {author && loaded && <Loader />}

                {author && !loaded && hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author && !loaded && !hasError && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && !loaded && !hasError && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    selectedPostId={selectedPost?.id}
                    onPostSelected={selectUser}
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
