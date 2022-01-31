import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../types/RootState';
import { Comments } from '../Comments/Comments';
import { NewComment } from '../NewComment/NewComment';

import './PostInfo.scss';

export const PostInfo:React.FC = () => {
  const selectedPost = useSelector((state:RootState) => state.postsReducer.selectedPost);
  const posts = useSelector((state: RootState) => state.postsReducer.posts);
  const post = posts.find(p => p.id === selectedPost);

  return (
    <>
      {!!post && (
        <div className="post-info">
          <h2 className="title">Post details:</h2>
          <article className="media">
            <figure className="media-left">
              <p className="image is-64x64" />
            </figure>
            <div className="media-content">
              <div className="content">
                <p>
                  {post.body}
                </p>
              </div>
              <Comments />
            </div>
          </article>
          <NewComment />
        </div>
      )}
    </>
  );
};
