export const LOAD = 'load';
export const DISPLAY = 'display';
export const REMOVE_ARTICLE = 'remove_article';
export const REMOVE_COMMENT = 'remove_comment';

export function load() {
  return (dispatch) => {
    dispatch({
      type: LOAD,
    });

    function loadUrl(url) {
      return fetch(url)
        .then(response => response.json())
        .then(data => data);
    }

    Promise.all([
      loadUrl('https://jsonplaceholder.typicode.com/posts'),
      loadUrl('https://jsonplaceholder.typicode.com/users'),
      loadUrl('https://jsonplaceholder.typicode.com/comments'),
    ])
      .then(([posts, users, comments]) => {
        const articles = posts.map((post) => ({
          ...post,
          user: users.find(user => user.id === post.userId),
          comments: comments
            .filter(commentItem => commentItem.postId === post.id),
        }))
        dispatch(display(articles));
      });
  };
}

export function display(articles) {
  return {
    type: DISPLAY,
    articles,
  };
}

export function removeArticle(articles, index) {
  return {
    type: REMOVE_ARTICLE,
    articles: articles.filter(item => item.id !== index),
  };
}

export function removeComment(articles, postIndex, commentIndex) {
  return {
    type: REMOVE_COMMENT,
    articles: articles.map((article) => {
      if (article.id !== postIndex) {
        return article;
      }
      return {
        ...article,
        comments: article.comments.filter(comment => comment.id !== commentIndex),
      };
    }),
  };
}
