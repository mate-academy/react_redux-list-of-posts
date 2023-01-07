import React, { useEffect } from 'react';
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
import { set, selectAuthor } from './features/author/authorSlice';
import { User } from './types/User';
import { getPosts, selectPosts } from './features/posts/postsSlice';
import {
  selectPost,
  setSelectedPost,
} from './features/selectedPost/selectedPostSlice';

export const App: React.FC = () => {
  const author = useAppSelector(selectAuthor);
  const dispatch = useAppDispatch();
  const setAuthor = (selectedAuthor: User) => {
    return dispatch(set(selectedAuthor));
  };

  const selectedPost = useAppSelector(selectPost);
  const setPost = (post: Post) => {
    return dispatch(setSelectedPost(post));
  };

  const { posts, status } = useAppSelector(selectPosts);

  const setPosts = (userId: number) => {
    return dispatch(getPosts(userId));
  };

  useEffect(() => {
    setPost({
      id: null,
      userId: 0,
      title: '',
      body: '',
    });

    if (author) {
      setPosts(author.id);
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
                  value={author}
                  onChange={setAuthor}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!author && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {author && status === 'loading' && (
                  <Loader />
                )}

                {author && status === 'failed' && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author && status === 'idle' && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && status === 'idle' && posts.length > 0 && (
                  <PostsList
                    posts={posts}
                    selectedPostId={selectedPost?.id || null}
                    onPostSelected={setPost}
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
