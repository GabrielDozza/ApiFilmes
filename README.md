# 🎬 API de Filmes

Projeto desenvolvido para a **Sprint 3 - Backend com Express.js**, com o objetivo de criar uma API RESTful para gerenciamento de filmes e suas reviews.

---

## 🚀 Sobre o Projeto

Esta API permite realizar operações completas de CRUD para **filmes** e **reviews**, possibilitando que usuários cadastrem filmes e adicionem avaliações relacionadas a cada um deles.

Os dados são armazenados em memória utilizando arrays de objetos.

---

## 🛠️ Tecnologias Utilizadas

* Node.js
* Express.js
* TypeScript

---

## 📂 Estrutura do Projeto

```
src/
 ├── data/
 │    ├── filmes.ts
 │    └── reviews.ts
 ├── routes/
 │    ├── filmesRoutes.ts
 │    └── reviewsRoutes.ts
 └── server.ts
```

---

## ▶️ Como executar o projeto

1. Clone o repositório:

```
git clone https://github.com/GabrielDozza/ApiFilmes.git
```

2. Acesse a pasta:

```
cd ApiFilmes
```

3. Instale as dependências:

```
npm install
```

4. Rode o servidor:

```
npm run dev
```

Servidor rodando em:

```
http://localhost:3000
```

---

## 📌 Rotas da API

### 🎬 Filmes

#### Criar filme

```
POST /filmes
```

Body:

```json
{
  "titulo": "Interestelar",
  "descricao": "Filme sobre espaço",
  "diretor": "Christopher Nolan",
  "ano": 2014,
  "genero": "Ficção"
}
```

---

#### Listar todos os filmes

```
GET /filmes
```

---

#### Buscar filme por ID

```
GET /filmes/:id
```

---

#### Atualizar filme

```
PUT /filmes/:id
```

---

#### Deletar filme

```
DELETE /filmes/:id
```

---

### ⭐ Reviews

#### Criar review para um filme

```
POST /filmes/:id/reviews
```

Body:

```json
{
  "comentario": "Muito bom!",
  "nota": 5
}
```

---

#### Listar reviews de um filme

```
GET /filmes/:id/reviews
```

---

#### Editar review

```
PUT /reviews/:id
```

---

#### Deletar review

```
DELETE /reviews/:id
```

---

## 📊 Status Codes

* 200 → Sucesso
* 201 → Criado
* 400 → Erro na requisição
* 404 → Não encontrado

---

## ⚠️ Observações

* Os dados são armazenados em memória (não persistem após reiniciar o servidor)
* Cada review está vinculada a um filme através do `filmeId`

---

## 🎯 Funcionalidades

✔ CRUD completo de filmes
✔ CRUD completo de reviews
✔ Associação entre filmes e reviews
✔ API RESTful com uso correto de métodos HTTP

---

## 🚀 Próximos Passos

* Integração com banco de dados
* Validações mais robustas
* Documentação com Swagger

---

## 👨‍💻 Autor

Gabriel Enzo Dozza

---
