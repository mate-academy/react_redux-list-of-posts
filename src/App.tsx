import React, { useEffect } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchUsers } from './features/usersSlice';
import { setAuthor } from './features/authorSlice';
import { fetchPostsByUser, clearPosts } from './features/postsSlice';
import {
  clearSelectedPost,
  setSelectedPost,
} from './features/selectedPostSlice';
import { User } from './types/User';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { posts, loaded, hasError } = useAppSelector(state => state.posts);
  const { author } = useAppSelector(state => state.author);
  const { selectedPost } = useAppSelector(state => state.selectedPost);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(clearSelectedPost());

    if (author) {
      dispatch(fetchPostsByUser(author.id));
    } else {
      dispatch(clearPosts());
    }
  }, [author, dispatch]);

  const renderedPosts = () => {
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
        onPostSelected={(post: Post | null) => dispatch(setSelectedPost(post))}
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
                <UserSelector
                  author={author}
                  onChange={(user: User) => dispatch(setAuthor(user))}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {renderedPosts()}
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
