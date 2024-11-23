import express from "express";
// Importa as dependências necessárias: o framework Express para criar a aplicação web
import routes from "./src/routes/postRoutes.js";

const app = express();
// Inicializa uma aplicação Express.
app.use(express.static("uploads"));
routes(app);

app.listen(3000, () => {
  console.log("Servidor escutando...");
});
// Inicia o servidor na porta 3000 e exibe uma mensagem no console quando o servidor estiver pronto para receber requisições.
