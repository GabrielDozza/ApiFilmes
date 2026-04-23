# 🎬 API de Filmes

Projeto desenvolvido para a **Sprint 3 - Backend com Express.js**, com o objetivo de criar uma API RESTful para gerenciamento de filmes e suas reviews.

---

## 🚀 Sobre o Projeto

Esta API permite realizar operações completas de CRUD para **filmes** e **reviews**, possibilitando que usuários cadastrem filmes e adicionem avaliações relacionadas a cada um deles.

Os dados são armazenados em um banco de dados PostgreSQL via Prisma ORM.

---

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **TypeScript** - Superset JavaScript
- **Prisma** - ORM para banco de dados
- **PostgreSQL** - Banco de dados relacional
- **CORS** - Middleware para Cross-Origin Resource Sharing

---

## 📂 Estrutura do Projeto

```
ApiFilmes/
├── prisma/
│   └── schema.prisma       # Schema do banco de dados
├── src/
│   ├── controllers/        # Controladores (lógica de requisição)
│   │   ├── filmesController.ts
│   │   └── reviewsController.ts
│   ├── database/
│   │   └── prisma.ts       # Configuração do Prisma
│   ├── repositories/       # Repositórios (acesso ao banco)
│   │   ├── filmesRepository.ts
│   │   └── reviewsRepository.ts
│   ├── routes/             # Definição de rotas
│   │   ├── filmesRoutes.ts
│   │   └── reviewsRoutes.ts
│   ├── services/           # Regras de negócio
│   │   ├── filmesService.ts
│   │   └── reviewsService.ts
│   ├── types/              # Tipos TypeScript
│   │   ├── Filme.ts
│   │   └── Review.ts
│   └── server.ts           # Servidor principal
├── .env                    # Variáveis de ambiente
├── .gitignore              # Arquivos ignorados pelo git
├── package.json            # Dependências do projeto
├── prisma.config.ts        # Configuração do Prisma
└── tsconfig.json           # Configurações TypeScript
```

---

## ▶️ Como executar o projeto

### Pré-requisitos

- Node.js (v18+)
- PostgreSQL (ou usar o banco cloud do Prisma)

### Passos

1. **Clone o repositório:**

```bash
git clone https://github.com/GabrielDozza/ApiFilmes.git
```

2. **Acesse a pasta:**

```bash
cd ApiFilmes
```

3. **Instale as dependências:**

```bash
npm install
```

4. **Configure as variáveis de ambiente:**

Edite o arquivo `.env` com sua URL do banco de dados:

```env
DATABASE_URL="sua-url-do-banco"
PORT=3000
NODE_ENV=development
```

5. **Gere o cliente Prisma:**

```bash
npx prisma generate
```

6. **Rode o servidor:**

```bash
npm run dev
```

Servidor rodando em: `http://localhost:3000`

---

## 📌 Rotas da API

### 🎬 Filmes

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/filmes` | Listar filmes (com paginação e busca) |
| GET | `/filmes/:id` | Buscar filme por ID |
| POST | `/filmes` | Criar novo filme |
| PUT | `/filmes/:id` | Atualizar filme |
| DELETE | `/filmes/:id` | Deletar filme |

#### Parâmetros de Query (GET /filmes)

| Parâmetro | Tipo | Descrição | Padrão |
|-----------|------|-----------|--------|
| `page` | number | Página atual | 1 |
| `limit` | Limit por página | 10 |
| `busca` | string | Buscar por título, diretor ou descrição | - |
| `genero` | string | Filtrar por gênero | - |

#### Exemplo - Listar filmes

```bash
GET /filmes?page=1&limit=10&busca=inter&genero=ficção
```

#### Exemplo - Criar filme

```bash
POST /filmes
```

```json
{
  "titulo": "Interestelar",
  "descricao": "Filme sobre espaço e viagem no tempo",
  "diretor": "Christopher Nolan",
  "ano": 2014,
  "genero": "Ficção Científica",
  "poster": "https://exemplo.com/poster.jpg",
  "duracao": 169
}
```

---

### ⭐ Reviews

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/filmes/:filmeId/reviews` | Listar reviews de um filme |
| POST | `/filmes/:filmeId/reviews` | Criar nova review |
| PUT | `/filmes/:filmeId/reviews/:id` | Atualizar review |
| DELETE | `/filmes/:filmeId/reviews/:id` | Deletar review |

#### Exemplo - Criar review

```bash
POST /filmes/1/reviews
```

```json
{
  "comentario": "Melhor filme de ficção científica já feito!",
  "nota": 10,
  "autor": "João Silva"
}
```

**Validações:**
- `nota` deve ser um número entre 0 e 10
- `comentario` é obrigatório

---

## 📊 Resposta Formatada

### Com Paginação

```json
{
  "data": [
    {
      "id": 1,
      "titulo": "Interestelar",
      "descricao": "Filme sobre espaço",
      "diretor": "Christopher Nolan",
      "ano": 2014,
      "genero": "Ficção Científica",
      "poster": "https://exemplo.com/poster.jpg",
      "duracao": 169,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

---

## 🧪 Testando a API

### Usando cURL

```bash
# Listar filmes
curl http://localhost:3000/filmes

# Criar filme
curl -X POST http://localhost:3000/filmes \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Matrix","descricao":"Filme sobre realidade virtual","diretor":"Irmãos Wachowski","ano":1999,"genero":"Ação"}'

# Listar reviews de um filme
curl http://localhost:3000/filmes/1/reviews

# Criar review
curl -X POST http://localhost:3000/filmes/1/reviews \
  -H "Content-Type: application/json" \
  -d '{"comentario":"Excelente!","nota":9,"autor":"Maria"}'
```

---

## 📝 Variáveis de Ambiente

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `DATABASE_URL` | URL do banco PostgreSQL | `postgresql://user:pass@localhost:5432/db` |
| `PORT` | Porta do servidor | `3000` |
| `NODE_ENV` | Ambiente | `development` ou `production` |

---

## 🔄 Próximas Melhorias

- [ ] Autenticação JWT
- [ ] Documentação com Swagger
- [ ] Testes unitários
- [ ] Cache com Redis
- [ ] Upload de imagens
- [ ] Deploy para produção

---

## 📄 Licença

ISC License - feel free to use this project.

---

## 👤 Autor

Gabriel Dozza