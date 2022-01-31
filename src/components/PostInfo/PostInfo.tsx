import { Post } from '../../Types/Post';
import { CommentsList } from '../CommentsList/CommentsList';
import { NewComment } from '../NewComment/NewComment';
import './PostInfo.scss';

type Props = {
  postQuery: string,
  post: Post,
};

export const PostInfo: React.FC<Props> = ({ postQuery, post }) => {
  return (
    <div className="App__content">
      <div className="PostDetails">
        <h2>Post details:</h2>
        <div className="PostDetails__post">{post.body}</div>
        <CommentsList id={post.id} />
        <div className="PostDetails__form-wrapper">
          <NewComment postQuery={postQuery} />
        </div>
      </div>
    </div>
  );
};
