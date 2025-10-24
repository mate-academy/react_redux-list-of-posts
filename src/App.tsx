// src/App.tsx

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; // Importações necessárias
import type { AppDispatch } from './app/store';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

// Importa componentes
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

// Importa Slices e Thunks
import { fetchUsers } from './features/users/usersSlice';
import { fetchPosts, selectSelectedPostId } from './features/posts/postsSlice';
// ⚠️ NOTA: Você precisará de seletores de status do postsSlice (ex: selectPostsLoaded, selectPostsHasError)

export const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  // 1. LÊ O ESTADO PRINCIPAL DO REDUX
  const selectedPostId = useSelector(selectSelectedPostId);

  // ⚠️ Mock de status para fins de demonstração (substitua pelos seletores reais)
  const loaded = true; // Use selectPostsLoaded
  const hasError = false; // Use selectPostsHasError

  // 2. EFEITO: Carrega dados essenciais UMA VEZ na montagem do App
  useEffect(() => {
    // Carrega a lista de usuários
    dispatch(fetchUsers());

    // Carrega a lista inicial de posts (a filtragem por autor ocorre no PostsList)
    dispatch(fetchPosts());
  }, [dispatch]);

  // 3. RENDERIZAÇÃO: Usa o estado do Redux e move a lógica para os componentes filhos
  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                {/* UserSelector AGORA LÊ E ESCREVE DIRETAMENTE NO REDUX */}
                <UserSelector />
              </div>

              <div className="block" data-cy="MainContent">
                {/* Lógica de status simplificada com base no Redux */}

                {/* Se não houver autor, mostramos a lista completa de posts (PostsList filtra) */}
                {/* O PostsList já lida com o estado de 'No posts yet' e 'Posts Loading Error' */}

                {!loaded && <Loader />}

                {loaded && hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {/* PostsList AGORA LÊ posts e selectedPostId DIRETAMENTE DO REDUX */}
                {loaded && !hasError && <PostsList />}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={classNames(
              'tile',
              'is-parent',
              'is-8-desktop',
              'Sidebar',
              {
                // A barra lateral está aberta se um post estiver selecionado no Redux
                'Sidebar--open': selectedPostId,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {/* PostDetails AGORA LÊ o post selecionado DIRETAMENTE DO REDUX */}
              {selectedPostId && <PostDetails />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
