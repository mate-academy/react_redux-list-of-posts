import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/bulma.sass';
import React, { useCallback, useEffect } from 'react';
import './App.scss';

import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { Loader } from './components/Loader';
import { PostDetails } from './components/PostDetails';
import { PostsList } from './components/PostsList';
import { UserSelector } from './components/UserSelector';
import { setAuthor } from './features/authorSlice';
import {
  clearPosts,
  clearSelectedPost,
  fetchUserPosts,
  setSelectedPost,
} from './features/postSlice';
import { Post } from './types/Post';
import { User } from './types/User';

export const App: React.FC = () => {
  const { author } = useAppSelector(state => state.author);
  const { posts, loaded, hasError, selectedPost } = useAppSelector(
    state => state.post,
  );

  const dispatch = useAppDispatch();

  const getSelectedPost = (post: Post | null) => {
    dispatch(setSelectedPost(post as Post));
  };

  const loadAuthor = (user: User) => {
    dispatch(setAuthor(user));
  };

  const loadUserPosts = useCallback(
    (userId: number) => {
      dispatch(fetchUserPosts(userId));
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(clearSelectedPost());

    if (author) {
      loadUserPosts(author.id);
    } else {
      dispatch(clearPosts());
    }
  }, [author, dispatch, loadUserPosts]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector value={author} onChange={loadAuthor} />
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
                    onPostSelected={getSelectedPost}
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
