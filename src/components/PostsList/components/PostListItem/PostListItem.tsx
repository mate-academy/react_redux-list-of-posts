import { FC } from 'react';
import Button from 'react-bootstrap/esm/Button';
import { Post } from '../../../../types/Post';
import classes from './PostListItem.module.scss';

type Props = {
  post: Post;
  handleShowModal: (id: string | number) => void;
};

export const PostListItem: FC<Props> = ({ post, handleShowModal }) => {
  return (
    <li className={classes.post}>
      <div className={classes.post__left}>
        <div className={classes.postTitle}>
          {post.title}
        </div>
        <p className={classes.postBody}>
          {post.body}
        </p>
      </div>

      <div className={classes.post__right}>
        <Button
          variant="outline-dark"
          onClick={() => handleShowModal(post.id)}
        >
          Open
        </Button>
      </div>
    </li>
  );
};
