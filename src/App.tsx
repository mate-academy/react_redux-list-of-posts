import React, { useEffect } from 'react';
import classNames from 'classnames';

import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';

import {
  clearSelectedPost,
  setSelectedPost,
} from './features/selectedPostSlice';
import { setPosts } from './features/postsSlice';
import { setAuthor } from './features/authorSlice';

import { Post } from './types/Post';
import { User } from './types/User';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const { author } = useAppSelector(state => state.author);
  const chooseAuthor = (chosenUser: User) => dispatch(
    setAuthor(chosenUser),
  );
  const { posts, isLoading, hasError } = useAppSelector(state => state.posts);

  const { selectedPost } = useAppSelector(state => state.selectedPost);
  const choosePost = (post: Post | null) => dispatch(
    setSelectedPost(post),
  );

  useEffect(() => {
    if (author) {
      dispatch(clearSelectedPost());
      dispatch(setPosts(author?.id));
    }
  }, [author?.id]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  selectedUser={author}
                  setSelectedUser={chooseAuthor}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!author && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {author && isLoading && (
                  <Loader />
                )}

                {author && !isLoading && hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author && !isLoading && !hasError && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && !isLoading && !hasError && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    selectedPostId={selectedPost?.id}
                    onPostSelected={choosePost}
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
