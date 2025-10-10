import React from 'react';

// Definição da interface Post (assumindo que já a definiu em algum lugar, mas para este componente, vamos defini-la localmente)
interface Post {
  id: string;
  title: string;
  content: string;
  userId: string;
  createdAt: number;
}

interface PostItemProps {
  post: Post;
  onSelectPost: (post: Post) => void;
  isSelected: boolean;
}

// Componente para exibir um único item da lista de posts
const PostItem: React.FC<PostItemProps> = ({ post, onSelectPost, isSelected }) => {
  
  // Função para formatar o timestamp de criação
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('pt-PT', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Classes Tailwind dinâmicas para o estado selecionado
  const selectedClasses = isSelected
    ? 'bg-blue-100 border-blue-600 shadow-lg'
    : 'bg-white hover:bg-gray-50 border-gray-200 shadow-md hover:shadow-lg transition duration-200';

  return (
    <div
      // Aplica as classes dinâmicas e base
      className={`p-4 border-l-4 rounded-lg cursor-pointer mb-3 ${selectedClasses}`}
      onClick={() => onSelectPost(post)}
      role="listitem"
      aria-current={isSelected ? 'true' : 'false'}
    >
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-semibold text-gray-800 truncate pr-4">
          {post.title}
        </h3>
        {isSelected && (
          <span className="text-sm font-medium text-blue-600 bg-blue-200 px-2 py-0.5 rounded-full flex-shrink-0">
            Selecionado
          </span>
        )}
      </div>

      <p className="text-sm text-gray-500 mt-1">
        Criado em: <time dateTime={new Date(post.createdAt).toISOString()}>{formatTime(post.createdAt)}</time>
      </p>

      {/* Exibe o userId do autor, formatado para caber no item */}
      <p className="text-xs text-gray-400 mt-1 truncate">
        Autor ID: {post.userId}
      </p>

      {/* Preview do conteúdo */}
      <p className="text-gray-600 mt-2 line-clamp-2 text-sm italic">
        {post.content.substring(0, 100)}...
      </p>

    </div>
  );
};

export default PostItem;
