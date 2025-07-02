import React, { useEffect, useCallback } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchUsers } from './features/users/usersSlice';
import { setAuthor } from './features/author/authorSlice';
import { fetchUserPosts, clearPosts } from './features/posts/postsSlice';
import {
  clearSelectedPost,
  setSelectedPost,
} from './features/selectedPost/selectedPostSlice';
import { User } from './types/User';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const { posts, loaded, hasError } = useAppSelector(state => state.posts);
  const author = useAppSelector(state => state.author.current);
  const selectedPost = useAppSelector(state => state.selectedPost.current);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(clearSelectedPost());

    if (author) {
      dispatch(fetchUserPosts(author.id));
    } else {
      dispatch(clearPosts());
    }
  }, [author, dispatch]);

  const handleAuthorChange = useCallback(
    (user: User) => {
      dispatch(setAuthor(user));
    },
    [dispatch],
  );

  const handlePostSelected = useCallback(
    (post: Post | null) => {
      dispatch(setSelectedPost(post));
    },
    [dispatch],
  );

  const renderPostsContent = () => {
    if (!author) {
      return <p data-cy="NoSelectedUser">No user selected</p>;
    }

    if (!loaded) {
      return <Loader />;
    }

    if (hasError) {
      return (
        <div className="notification is-danger" data-cy="PostsLoadingError">
          Something went wrong!
        </div>
      );
    }

    if (posts.length === 0) {
      return (
        <div className="notification is-warning" data-cy="NoPostsYet">
          No posts yet
        </div>
      );
    }

    return (
      <PostsList
        posts={posts}
        selectedPostId={selectedPost?.id}
        onPostSelected={handlePostSelected}
      />
    );
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector author={author} onChange={handleAuthorChange} />
              </div>

              <div className="block" data-cy="MainContent">
                {renderPostsContent()}
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
