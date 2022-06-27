import { RootState } from '../../store';

export const Posts = (state: RootState) => state.posts.postsList;

export const SelectedPost = ({ posts }: RootState) => (
  posts.activePost
);

export const Comments = ({ posts }: RootState) => posts.comments;

export const Details = ({ posts }: RootState) => posts.details;
