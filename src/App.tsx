import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { Post } from './types/Post';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from './app/store';
import { fetchUserPosts } from './features/posts/postsSlice';
import { setSelectedPost } from './features/selectedPost/selectedPost';
import { setAuthor } from './features/author/authorSlice';

export const App: React.FC = () => {
  const { posts, loaded, hasError } = useSelector((state: RootState) => state.posts)
  const author = useSelector((state: RootState) => state.author.author);
  const selectedPost = useSelector((state: RootState) => state.selectedPost.selectedPost);

  const dispatch = useDispatch<AppDispatch>();


  useEffect(() => {
    // we clear the post when an author is changed
    // not to confuse the user

    if (author) {
      dispatch(fetchUserPosts(author.id));
    }

    dispatch(setSelectedPost(null))
  }, [author, dispatch]);

  const handleAuthorChange= (newAuthor: User | null) => {
    dispatch(setAuthor(newAuthor));
  }

  const handlePostSelected = (post: Post | null) => {
    dispatch(setSelectedPost(post));
  }

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
                    userId={author.id}

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
