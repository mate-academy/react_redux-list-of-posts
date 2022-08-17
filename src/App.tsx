import React, { useState } from 'react';

import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { Post } from './types/Post';
// import { Counter } from './features/counter/Counter';
import { useGetPostsQuery } from './api/generalApi';
import { User } from './types/User';

export const App: React.FC = () => {
  const [author, setAuthor] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const {
    data = [],
    isLoading,
    isError,
  } = useGetPostsQuery(author?.id || null);

  return (
    <main className="section">
      {/* Learn the Redux Toolkit usage example in src/app and src/features/counter */}
      {/* <Counter /> */}
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector value={author} onChange={setAuthor} />
              </div>

              <div className="block">
                {!author && (
                  <p>No user selected</p>
                )}

                {author && isLoading && (
                  <Loader />
                )}

                {author && isLoading && isError && (
                  <div className="notification is-danger">
                    Something went wrong!
                  </div>
                )}

                {author && !isLoading && !isError && data.length === 0 && (
                  <div className="notification is-warning">
                    No posts yet
                  </div>
                )}

                {author && !isLoading && !isError && data.length > 0 && (
                  <PostsList
                    posts={data}
                    selectedPostId={selectedPost?.id}
                    onPostSelected={setSelectedPost}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="tile is-parent is-8-desktop">
            <div className="tile is-child box is-success ">
              {selectedPost ? (
                <PostDetails post={selectedPost} />
              ) : (
                <p>Choose a post</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
