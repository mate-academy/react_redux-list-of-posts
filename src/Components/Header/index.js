import { connect } from 'react-redux';
import Header from './Header';

const ImprovedHeader = connect(
  state => ({
    users: state.users,
    posts: state.posts,
    comments: state.comments,
  })
)(Header);

export {
  ImprovedHeader as Header,
};
