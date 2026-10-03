import React, { useEffect } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

import { getUserPosts } from './api/posts';

import { User } from './types/User';
import { Post } from './types/Post';

import { useAppDispatch, useAppSelector } from './app/hooks';

import { setAuthor } from './features/author/authorSlice';
import {
  resetPosts,
  setPosts,
  setPostsError,
  setPostsLoading,
} from './features/posts/postsSlice';
import { setSelectedPost } from './features/selectedPost/selectedPostSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const author = useAppSelector(state => state.author);
  const selectedPost = useAppSelector(state => state.selectedPost);

  const {
    items: posts,
    loaded,
    hasError,
  } = useAppSelector(state => state.posts);

  useEffect(() => {
    dispatch(setSelectedPost(null));

    if (!author) {
      dispatch(resetPosts());

      return;
    }

    const loadUserPosts = async () => {
      dispatch(setPostsLoading());

      try {
        const postsFromServer = await getUserPosts(author.id);

        dispatch(setPosts(postsFromServer));
      } catch {
        dispatch(setPostsError());
      }
    };

    loadUserPosts();
  }, [author, dispatch]);

  const handleAuthorChange = (newAuthor: User | null) => {
    dispatch(setAuthor(newAuthor));
  };

  const handlePostSelected = (post: Post | null) => {
    dispatch(setSelectedPost(post));
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
                {!author && <p data-cy="NoSelectedUser"> No user selected </p>}

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
                    onPostSelected={handlePostSelected}
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
                'Sidebar--open': selectedPost !== null,
              },
            )}
          >
            <div className="tile is-child box is-success">
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
