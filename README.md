# Studio Ghibli API

[Studio Ghibli API - projeto ao qual consumo uma API pública dos estúdios ghibli, exibo uma lista dos filmes com suas informações e algumas opções de filtros (assistidos, favoritos) e ações (adicionar comentários e classificação). ]

## 📋 Pré-requisitos

- Node.js
- npm
- Opcional: Yarn (se preferir usar em vez do npm)

## 🛠️ Ferramentas Utilizadas

- **Linguagem:** TypeScript
- **Framework:** Next.js
- **Estilização:** Tailwind CSS
- **Bibliotecas UI:** ShadCN
- **Gerenciamento de Estado:** Zustand
- **Testes:** Jest, React Testing Library
- **HTTP Client:** Axios
- **Formatação:** ESLint, Prettier

## 🚀 Requisitos implementados:

### Listagem de filmes com as seguintes informações:

- Imagem do filme, título, ano de lançamento, duração, sinopse, diretor, produtor e nota de avaliação.

### Marcar filme como assistido e favorito

### Filtro filmes por títulos e por sinopse(opcional)

### Adicionar anotações a um filme

### Classificar um filme

### Filtrar filmes

- Assistidos, favoritos, com anotações, classificação.

### Ordenação de filmes (crescente e decrescente) por:

- Título, duração, avaliação pessoal e nota de avaliação.

### Uso do typescript

### Responsividade básica

### Mensagens toast de feedback para o usuário

- Ao marcar e desmarcar filme assistido e favorito.
- Adicionar, editar e remover informações.

### Testes unitários

- Renderização de componentes e ações da store.

### Separação clara de responsabilidades

- componentes, hooks, services, store, types, e utils

### Bibliotecas de estilo

### Contexto para persistencia de meta dados

### Solução para gerenciar estados assíncronos

## 📂 Estrutura do Projeto

/src
|-- /app # Rotas principais
|-- /components # Componentes reutilizáveis
|-- /hooks # Custom hooks
|-- /services # Serviços externos
|-- /store # Gerenciamento de estado global
|-- /types # Tipos TypeScript
|-- /utils # Funções utilitárias

## 🚀 Instalação e Execução

Siga estas etapas para instalar e executar o projeto localmente:

### Ambiente de Desenvolvimento

1. Clone o repositório:

   ```bash
   git clone https://github.com/alvesgabrieel/studio-ghibli-challenger.git
   ```

2. Baixe dependencias:

   ```bash
   npm install
    # ou
   yarn install
   ```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

Acesse: http://localhost:3000

## 🧪 Testes

A suíte de testes cobre:

### Renderização de componentes

### Interações do usuário

### Comportamento da store (Zustand)

1. Como rodar os testes:
   ```bash
   npm test
   ```
