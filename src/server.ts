import express from "express";
import filmesRoutes from "./routes/filmesRoutes";
import reviewsRoutes from "./routes/reviewsRoutes";

const app = express();

app.use(express.json());

// Rotas
app.use("/filmes", filmesRoutes);
app.use("/filmes", reviewsRoutes);

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});

app.get("/", (req, res) => {
    res.send("API funcionando 🚀");
});