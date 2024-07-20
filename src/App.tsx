import React, { useCallback, useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { Post } from './types/Post';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setAuthor } from './features/author/authorSlice';
import { User } from './types/User';
import {
  clearPosts,
  clearSelectedPost,
  loadUserPosts,
  setSelectedPost,
} from './features/posts/postsSlice';

export const App: React.FC = () => {
  const { posts, loaded, hasError, selectedPost } = useAppSelector(
    state => state.posts,
  );
  const { author } = useAppSelector(state => state.author);
  const dispatch = useAppDispatch();

  const getLoadUserPosts = useCallback(
    (userId: number) => {
      dispatch(loadUserPosts(userId));
    },
    [dispatch],
  );

  const setSelectedAuthor = (user: User) => {
    dispatch(setAuthor(user));
  };

  const setPostSelected = (post: Post | null) => {
    dispatch(setSelectedPost(post as Post));
  };

  useEffect(() => {
    dispatch(clearSelectedPost());

    if (author) {
      getLoadUserPosts(author.id);
    } else {
      dispatch(clearPosts);
    }
  }, [author, dispatch, getLoadUserPosts]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector value={author} onChange={setSelectedAuthor} />
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
                    onPostSelected={setPostSelected}
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
