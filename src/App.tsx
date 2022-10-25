import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import classNames from 'classnames';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { Counter } from './features/counter/Counter';

import { useAppDispatch, useAppSelector } from './app/hooks';
import * as postsSlice from './features/posts/postsSlice';

import { Post } from './types/Post';
import { User } from './types/User';

const IS_COUNTER = false;

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const author: User | null = useAppSelector(
    (state => state.users),
  ).selectedUser;

  const { allPosts, status: PostsStatus, selectedPost } = useAppSelector(
    (state => state.posts),
  );

  const onPostSelect = (post: Post | null) => {
    dispatch(postsSlice.setPost(post));
  };

  useEffect(() => {
    // we clear the post when an author is changed
    // not to confuse the user
    // setSelectedPost(null);
    dispatch(postsSlice.setPost(null));

    if (author) {
      dispatch(postsSlice.getPostsAsync(author.id));
    }
  }, [author?.id]);

  return (
    <main className="section">
      {/* Learn the Redux Toolkit usage example in src/app and src/features/counter */}
      {IS_COUNTER && <Counter />}

      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector value={author} />
              </div>

              <div className="block" data-cy="MainContent">
                {!author && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {author && PostsStatus === 'loading' && (
                  <Loader />
                )}

                {author && PostsStatus === 'failed' && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author && PostsStatus === 'idle' && allPosts?.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {
                  author
                  && PostsStatus === 'idle'
                  && allPosts
                  && allPosts.length > 0
                  && (
                    <PostsList
                      posts={allPosts}
                      selectedPostId={selectedPost?.id}
                      onPostSelected={onPostSelect}
                    />
                  )
                }
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
                <PostDetails />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
