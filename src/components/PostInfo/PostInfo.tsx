import { Post } from '../../Types/Post';
import { CommentsList } from '../CommentsList/CommentsList';
import { NewComment } from '../NewComment/NewComment';
import './PostInfo.scss';

type Props = {
  postQuery: string,
  posts: Post[],
};

export const PostInfo: React.FC<Props> = ({ postQuery, posts }) => {
  return (
    <div className="App__content">
      <div className="PostDetails">
        <h2>Post details:</h2>
        <div className="PostDetails__post">{(posts.find(a => a.id === +postQuery))?.body}</div>
        {postQuery && <CommentsList id={(posts.find(a => a.id === +postQuery))?.id} />}
        <div className="PostDetails__form-wrapper">
          <NewComment postQuery={postQuery} />
        </div>
      </div>
    </div>
  );
};
