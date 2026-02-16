import React, { useEffect, useState } from 'react';

// === 1. UserSelector PLACEHOLDER ===
// Este componente tem o 'data-testid' necessário para o Cypress.
const UserSelector = () => {
    const [localSelectedUser, setLocalSelectedUser] = useState<number | ''>('');

    return (
        // O elemento que o teste procura: data-testid="user-selector"
        <div data-testid="user-selector" className="p-4 bg-white rounded-xl shadow-lg mb-8 border-l-4 border-yellow-500 max-w-2xl mx-auto">
            <div className="flex justify-between items-center">
                <label htmlFor="user-select" className="font-semibold text-lg text-gray-700">Filtro de Usuário (UserSelector Placeholder)</label>
                <input
                    id="user-select"
                    type="number"
                    placeholder="ID do Usuário"
                    value={localSelectedUser}
                    onChange={(e) => setLocalSelectedUser(e.target.value === '' ? '' : parseInt(e.target.value))}
                    className="p-2 border border-gray-300 rounded-lg w-32 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <button 
                    className="px-4 py-2 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-600 transition duration-300 shadow-md"
                    onClick={() => console.log('Simulação: ID selecionado', localSelectedUser)}
                >
                    Buscar
                </button>
            </div>
        </div>
    );
};

// === 2. Interfaces (Tipagem) ===
interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
}

// === 3. Componente Principal da Página ===
// Usando 'function Page()' para garantir compatibilidade com o padrão de rotas.
export default function Page() {
    // Mocking do estado do Redux com estado local do React
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null); // Mock ID inicial

    // Simulação de carregamento de dados
    useEffect(() => {
        setLoading(true);
        setError(null);
        
        const mockPosts: Post[] = [
            { id: 1, title: 'Primeiro Artigo de Exemplo', body: 'Este é o corpo do primeiro post, criado por um usuário específico.', userId: 1 },
            { id: 2, title: 'Um Estudo sobre React', body: 'Explorando as funcionalidades dos hooks e a gestão de estado.', userId: 1 },
            { id: 3, title: 'Notícias da Tecnologia', body: 'As últimas novidades sobre o desenvolvimento web e frameworks.', userId: 2 },
            { id: 4, title: 'Otimização de Performance', body: 'Dicas para tornar a sua aplicação React mais rápida e eficiente.', userId: 3 },
            { id: 5, title: 'Introdução ao Tailwind CSS', body: 'Uma abordagem de utilidade para styling rápido e responsivo.', userId: 2 },
        ];
        
        // Simulação de delay de API (2000ms no Cypress)
        const timer = setTimeout(() => {
            setLoading(false);
            
            const filteredPosts = selectedUserId 
                ? mockPosts.filter(p => p.userId === selectedUserId)
                : mockPosts;

            setPosts(filteredPosts);

        }, 1500); // 1.5 segundos de delay na aplicação

        return () => clearTimeout(timer);
    }, [selectedUserId]); 

    // Renderização condicional do conteúdo
    const renderContent = () => {
        if (loading) {
            return (
                <div className="flex justify-center items-center py-10">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mr-3"></div>
                    <p className="text-center text-2xl font-medium text-indigo-600">Carregando posts...</p>
                </div>
            );
        }
        if (error) {
            return <p className="text-center text-2xl font-bold text-red-600 py-10">Erro ao carregar: {error}</p>;
        }
        if (posts.length === 0) {
            return <p className="text-center text-xl text-gray-500 py-10">Nenhum post encontrado.</p>;
        }

        return (
            // Seletor que o teste procura: .grid > div
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map(post => (
                    <div key={post.id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 border-t-4 border-indigo-400">
                        <h3 className="text-xl font-extrabold text-gray-900 mb-2">{post.title}</h3>
                        <p className="text-gray-600 line-clamp-3">{post.body}</p>
                        <p className="text-sm text-indigo-500 mt-3 font-mono font-bold">Usuário ID: {post.userId}</p>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-10 font-sans">
            <header className="text-center mb-12">
                {/* Título que o teste procura: 'Redux Post Viewer (Mocked)' */}
                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 pb-3 inline-block border-b-4 border-indigo-600">
                    Redux Post Viewer (Mocked)
                </h1>
                <p className="mt-3 text-lg text-gray-600">Aplicação de exemplo para listagem de posts e seleção de usuário. (Estado simulado)</p>
            </header>

            <UserSelector /> 

            <main className="mt-10 max-w-7xl mx-auto">
                {renderContent()}
            </main>
        </div>
    );
}
