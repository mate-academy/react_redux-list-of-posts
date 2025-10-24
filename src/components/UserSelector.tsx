/// src/components/UserSelector.tsx

import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';

// 1. IMPORTAÇÃO NECESSÁRIA: Importe o tipo User (Se não existir, crie-o em ../types/User.ts)
import { User } from '../types/User';

// 2. IMPORTAÇÕES DO REDUX
import {
  selectAllUsers,
  selectActiveAuthorId,
  authorSelected, // Ação para definir o autor ativo
} from '../features/users/usersSlice';

export const UserSelector: React.FC = () => {
  const dispatch = useDispatch();

  // 3. LÊ OS DADOS DO REDUX
  const users: User[] = useSelector(selectAllUsers);
  const activeAuthorId: number | null = useSelector(selectActiveAuthorId);

  // CÓDIGO CORRIGIDO: Encontra o objeto do usuário ativo
  const selectedUser: User | null =
    users.find(user => user.id === activeAuthorId) || null;

  // O estado local `expanded` é mantido, pois é apenas um estado de UI
  const [expanded, setExpanded] = useState(false);

  // O useEffect para fechar o dropdown no clique externo é mantido
  useEffect(() => {
    if (!expanded) {
      return;
    }

    const handleDocumentClick = () => {
      setExpanded(false);
    };

    document.addEventListener('click', handleDocumentClick);

    // eslint-disable-next-line consistent-return
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [expanded]);

  // Função para lidar com a seleção de um usuário
  const handleUserSelect = (userId: number) => {
    // 4. DISPARA A AÇÃO: Define o novo autor ativo no Redux Store
    dispatch(authorSelected(userId));
    setExpanded(false); // Fecha o dropdown após a seleção
  };

  // Função para remover o filtro e selecionar "Todos os posts"
  const handleClearSelection = () => {
    dispatch(authorSelected(null)); // Define o autor ativo como null
    setExpanded(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': expanded })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={e => {
            e.stopPropagation();
            setExpanded(current => !current);
          }}
        >
          {/* Usa o usuário ativo do Redux para o texto do botão */}
          <span>{selectedUser?.name || 'Selecione um Autor'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {/* Opção para limpar o filtro (selecionar 'Todos') */}
          <a
            href="#user-all"
            onClick={handleClearSelection}
            className={classNames('dropdown-item', {
              'is-active': activeAuthorId === null,
            })}
          >
            **Todos os Posts**
          </a>

          <hr className="dropdown-divider" />

          {/* CÓDIGO CORRIGIDO: Mapeia a lista de usuários lida do Redux */}
          {users.map((user: User) => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              onClick={() => {
                handleUserSelect(user.id);
              }}
              className={classNames('dropdown-item', {
                'is-active': user.id === activeAuthorId,
              })}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
