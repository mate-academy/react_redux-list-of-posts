import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Post } from '../types/Post';
import { loadComments } from '../features/commentsSlice';
import { Comments } from './Comments';

type Props = {
  post: Post
};

enum Element {
  CommentsFC = 'comments',
  Button = 'button',
  Form = 'form',
}

export const PostDetails: React.FC<Props> = ({ post }) => {
  const { loaded, hasError } = useAppSelector(state => state.comments);
  const [visible, setVisible] = useState(false);
  const dispatch = useAppDispatch();

  const checkCondition = (element: Element) => {
    const condition = {
      comments: true,
      button: !visible,
      form: visible,
    }[element];

    return loaded && !hasError && condition;
  };

  useEffect(() => {
    dispatch(loadComments(post.id));
  }, [post.id]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${post.id}: ${post.title}`}
        </h2>

        <p data-cy="PostBody">
          {post.body}
        </p>
      </div>

      <div className="block">
        {!loaded
          ? <Loader />
          : (hasError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          ))}

        {checkCondition(Element.CommentsFC) && <Comments />}

        {checkCondition(Element.Button) && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {checkCondition(Element.Form) && (
          <NewCommentForm postId={post.id} />
        )}
      </div>
    </div>
  );
};
