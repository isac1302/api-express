const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// Middleware de log (exemplo de middleware)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Serve os arquivos da pasta public (index.html na raiz "/")
app.use(express.static(path.join(__dirname, "public")));

// "Banco" em memória
let usuarios = [
  { id: 1, nome: "João" },
  { id: 2, nome: "Maria" },
];

// GET - listar
app.get("/usuarios", (req, res) => {
  res.json(usuarios);
});

// GET - por ID
app.get("/usuarios/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const usuario = usuarios.find((u) => u.id === id);

  if (!usuario) {
    return res.status(404).json({ erro: "Usuário não encontrado" });
  }
  res.json(usuario);
});

// POST - criar
app.post("/usuarios", (req, res) => {
  const nome = req.body.nome;

  if (!nome || typeof nome !== "string" || !nome.trim()) {
    return res.status(400).json({ erro: "O campo 'nome' é obrigatório" });
  }

  const novoUsuario = {
    id: usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1,
    nome: nome.trim(),
  };

  usuarios.push(novoUsuario);
  res.status(201).json(novoUsuario);
});

// PUT - atualizar
app.put("/usuarios/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const usuario = usuarios.find((u) => u.id === id);

  if (!usuario) {
    return res.status(404).json({ erro: "Usuário não encontrado" });
  }

  const nome = req.body.nome;
  if (!nome || typeof nome !== "string" || !nome.trim()) {
    return res.status(400).json({ erro: "O campo 'nome' é obrigatório" });
  }

  usuario.nome = nome.trim();
  res.json(usuario);
});

// DELETE - remover
app.delete("/usuarios/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = usuarios.findIndex((u) => u.id === id);

  if (index === -1) {
    return res.status(404).json({ erro: "Usuário não encontrado" });
  }

  usuarios.splice(index, 1);
  res.json({ mensagem: "Usuário removido" });
});

// Porta dinâmica (exigido pelo Render)
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
