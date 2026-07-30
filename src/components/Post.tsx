type PostType = {
  id: number;
  title: string;
  body: string;
};

type Props = {
  post: PostType;
  selectedPost: PostType | null;
  onSelect: (post: PostType) => void;
};

export const Post = ({ post, selectedPost, onSelect }: Props) => {
  const isSelected = selectedPost?.id === post.id;

  return (
    <article data-cy="Post" className="card">
      <div className="card-content">
        <button
          type="button"
          data-cy="PostButton"
          className={isSelected ? 'button' : 'button is-light'}
          onClick={() => onSelect(post)}
        >
          {isSelected ? 'Close' : 'Open'}
        </button>

        <p data-cy="PostId">{post.id}</p>

        <h3 className="title is-5">{post.title}</h3>

        <p>{post.body}</p>
      </div>
    </article>
  );
};
