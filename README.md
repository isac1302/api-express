# API Express - Usuários

## Rodar localmente
```bash
npm install
npm run dev
```
Acesse http://localhost:3000

## Rotas
| Método | Rota            | Descrição         |
|--------|-----------------|-------------------|
| GET    | /usuarios       | Lista usuários    |
| GET    | /usuarios/:id   | Busca por ID      |
| POST   | /usuarios       | Cria (body: nome) |
| PUT    | /usuarios/:id   | Atualiza          |
| DELETE | /usuarios/:id   | Remove            |

## Deploy no Render
- Build Command: `npm install`
- Start Command: `npm run dev` (ou `npm start`)
