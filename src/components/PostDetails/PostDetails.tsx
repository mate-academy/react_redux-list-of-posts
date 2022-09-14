import { useState, useEffect } from 'react';

import { Comments } from '../Comments/Comments';

import { useAppSelector } from '../../redux/hooks';

import { IPost } from '../../types/Post.interface';

export const PostDetails: React.FC = () => {
  const { currentPost } = useAppSelector(state => state.posts);
  const [postData, setPostData] = useState<IPost | null>(null);

  useEffect(() => {
    if (!currentPost) {
      setTimeout(() => setPostData(null), 500);
    } else {
      setPostData(currentPost);
    }
  }, [currentPost]);

  if (!postData) {
    return <p>Choose a post</p>;
  }

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${postData.id}: `}
          {postData.title}
        </h2>

        <p data-cy="PostBody">
          {postData.body}
        </p>
      </div>

      <Comments />
    </div>
  );
};
