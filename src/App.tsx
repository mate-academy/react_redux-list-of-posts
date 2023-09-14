import React from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './features/posts/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './features/users/UserSelector';
import { Loader } from './components/Loader';
import { Post } from './types/Post';
import * as authorActions from './features/author/authorSlice';
import * as postsActions from './features/posts/postsSlice';
import * as selectedPostActions from './features/selectedPost/selectedPost';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { User } from './types/User';

export const App: React.FC = () => {
  const { author } = useAppSelector(state => state.author);
  const { posts, isLoading, error } = useAppSelector(state => state.posts);
  const { post } = useAppSelector(state => state.selectedPost);

  const dispatch = useAppDispatch();

  const onChange = (newAuthor: User) => {
    dispatch(authorActions.set(newAuthor));

    dispatch(postsActions.init(newAuthor.id));
    dispatch(selectedPostActions.clear());
  };

  const onPostSelected = (newPost: Post | null) => {
    if (newPost) {
      dispatch(selectedPostActions.set(newPost));
    } else {
      dispatch(selectedPostActions.clear());
    }
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector value={author} onChange={onChange} />
              </div>

              <div className="block" data-cy="MainContent">
                {!author && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {author && isLoading && !error && (
                  <Loader />
                )}

                {author && isLoading && error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author && !isLoading && !error && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && !isLoading && !error && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    selectedPostId={post?.id}
                    onPostSelected={onPostSelected}
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
                'Sidebar--open': post,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {post && (
                <PostDetails post={post} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
