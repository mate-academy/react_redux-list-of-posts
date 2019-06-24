import { connect } from 'react-redux';
import { removeArticle } from '../redux/actions';
import Post from './Post';

function mapStateToProps(state, ownProps) {
  return {
    articles: state.articles,
    title: ownProps.article.title,
    text: ownProps.article.body,
    author: ownProps.article.user,
    comments: ownProps.article.comments,
    index: ownProps.article.id,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    removeArticle: (articles, index) => dispatch(removeArticle(articles, index)),
  };
}

const PostHandler = connect(mapStateToProps, mapDispatchToProps)(Post);

export default PostHandler;
