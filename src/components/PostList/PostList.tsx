import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Post } from '../../Types/Post';
import './PostList.scss';

export type Props = {
  post: Post,
  searchParams: any,
  postQuery: string,
};

export const PostList: React.FC<Props> = ({ post, searchParams, postQuery }) => {
  const [openPostInfo, setopenPostInfo] = useState(false);
  const navigate = useNavigate();

  const buttonClick = useCallback((id: number) => {
    setopenPostInfo(!openPostInfo);

    if (+postQuery === id) {
      searchParams.delete('postId');
    } else {
      searchParams.set('postId', id);
    }

    navigate(`?${searchParams.toString()}`, { replace: true });
  }, [openPostInfo]);

  return (
    <li className="PostsList__item">
      <div>
        <b>{`User ${post.userId}: `}</b>
        {post.title}
      </div>
      <button
        type="button"
        onClick={() => buttonClick(post.id)}
        className="PostsList__button button"
      >
        {+postQuery === post.id ? 'close' : 'open'}
      </button>
    </li>
  );
};
