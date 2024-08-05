type PostDetailsHeaderProps = {
  id: number;
  title: string;
  body: string;
};

export const PostDetailsHeader: React.FC<PostDetailsHeaderProps> = ({
  id,
  title,
  body,
}) => (
  <div className="block">
    <h2 data-cy="PostTitle">{`#${id}: ${title}`}</h2>
    <p data-cy="PostBody">{body}</p>
  </div>
);
