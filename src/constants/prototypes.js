import PropTypes from 'prop-types';

export const AppPropTypes = {
  isLoaded: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  loadPosts: PropTypes.func.isRequired,
  searchPost: PropTypes.func.isRequired,
};

export const PostListPropTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export const PostPropTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string,
    user: PropTypes.object,
    comments: PropTypes.array,
  }).isRequired,
  deletePost: PropTypes.func.isRequired,
};

export const CommentListPropTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export const CommentPropTypes = {
  comment: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    body: PropTypes.string,
  }).isRequired,
  deleteComment: PropTypes.func.isRequired,
};

export const UserPropTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  address: PropTypes.shape({
    street: PropTypes.string,
    suite: PropTypes.string,
    city: PropTypes.string,
    zipcode: PropTypes.string,
  }),
};
