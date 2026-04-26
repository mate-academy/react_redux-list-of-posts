/* eslint-disable no-param-reassign */
/* eslint-disable  @typescript-eslint/indent */

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
import { setAuthor } from './features/author/authorSlice';
import { fetchUserPosts, clearPosts } from './features/posts/postsSlice';
import { User } from './types/User';
import { Post } from './types/Post';
import { setSelectedPost } from './features/selectedPost/selectedPostSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const author = useAppSelector(state => state.author.value);
  const posts = useAppSelector(state => state.posts);
  const selectedPost = useAppSelector(state => state.selectedPost.value);

  useEffect(() => {
    // we clear the post when an author is changed
    // not to confuse the user
    dispatch(setSelectedPost(null));

    if (author) {
      dispatch(fetchUserPosts(author.id));
    } else {
      dispatch(clearPosts());
    }
  }, [author, dispatch]);

  const handleAuthorChange = (user: User | null) => {
    dispatch(setAuthor(user));
  };

  const handlePostSelect = (post: Post | null) => {
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
                {!author && <p data-cy="NoSelectedUser">No user selected</p>}

                {author && !posts.loaded && <Loader />}

                {author && posts.loaded && posts.hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author &&
                  posts.loaded &&
                  !posts.hasError &&
                  posts.items.length > 0 && (
                    <PostsList
                      posts={posts.items}
                      selectedPostId={selectedPost?.id}
                      onPostSelected={handlePostSelect}
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
