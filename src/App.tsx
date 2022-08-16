import React, { useState } from 'react';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

import { User } from './types/User';
import { Post } from './types/Post';
import { useGetUserPostsQuery } from './app/ReduxToolKitApi';

export const App: React.FC = () => {
  const [author, setAuthor] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const {
    data = [],
    isLoading,
    isError,
  } = useGetUserPostsQuery(author?.id || null);

  return (
    <main className="section">
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
