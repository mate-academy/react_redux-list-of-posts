import React, { useCallback, useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { Counter } from './features/counter/Counter';
import { useAppDispatch } from './app/hooks';
import { fetchUsers } from './features/users/usersSlice';
import { setAuthor } from './features/author/authorSlice';
import { fetchUserPosts, setPosts } from './features/posts/postsSlice';
import { Post } from './types/Post';
import { setSelectedPost as setSelectedPostAction }
  from './features/selectedPost/selectedPostSlice';
import { usePosts } from './hooks/usePosts';
import { useSelectedPost } from './hooks/useSelectedPost';
import { useAuthor } from './hooks/useAuthor';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { author } = useAuthor();
  const { value: selectedPost } = useSelectedPost();
  const { items: posts, loaded, hasError } = usePosts();

  const loadUserPosts = useCallback(
    (userId: number) => {
      dispatch(fetchUserPosts(userId));
    },
    [dispatch],
  );

  const setSelectedPost = useCallback(
    (value: Post | null) => {
      dispatch(setSelectedPostAction(value));
    },
    [dispatch],
  );

  useEffect(() => {
    setSelectedPost(null);

    if (author) {
      loadUserPosts(author.id);
    } else {
      dispatch(setPosts([]));
    }
  }, [author, dispatch, loadUserPosts, setSelectedPost]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <main className="section">
      <Counter />

      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  value={author}
                  onChange={value => dispatch(setAuthor(value))}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!author && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {author && !loaded && (
                  <Loader />
                )}

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
