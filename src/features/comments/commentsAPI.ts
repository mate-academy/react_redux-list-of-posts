import { getPostComments } from '../../api/comments';

export const loadPostComments = async (postId: number) => {
  const postComments = await getPostComments(postId);

  return postComments;
};
