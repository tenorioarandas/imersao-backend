// Importa o módulo express para criação de servidores web
import express from "express";

// Importa o módulo multer para lidar com uploads de arquivos
import multer from "multer";

// Importa funções controladoras para posts
import {
  listarPosts,
  postarNovoPost,
  uploadImagem,
  atualizarNovoPost,
} from "../controllers/postsController.js";

import cors from "cors";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200,
};

// Define o armazenamento para arquivos enviados
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define o diretório de destino para os uploads ("uploads/")
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // Mantém o nome original do arquivo enviado
    cb(null, file.originalname);
  },
});

// Configura o middleware multer para uploads
const upload = multer({ dest: "./uploads", storage });

// Define as rotas da aplicação
const routes = (app) => {
  // Permite que o servidor processe requisições com corpo JSON
  app.use(express.json());
  app.use(cors(corsOptions));
  // Rota GET para listar todos os posts (implementada em listarPosts)
  app.get("/posts", listarPosts);

  // Rota POST para criar um novo post (implementada em postarNovoPost)
  app.post("/posts", postarNovoPost);

  // Rota POST para upload de imagem (usa middleware multer e função uploadImagem)
  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id", atualizarNovoPost);
};

// Exporta a função routes para uso em outros módulos
export default routes;
