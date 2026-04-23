import "dotenv/config";
import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import filmesRoutes from "./routes/filmesRoutes";
import reviewsRoutes from "./routes/reviewsRoutes";

class AppServer {
  private static instance: AppServer | null = null;
  public readonly app: Application;

  private constructor() {
    this.app = express();
    this.init();
  }

  public static getInstance(): AppServer {
    if (!AppServer.instance) {
      AppServer.instance = new AppServer();
    }
    return AppServer.instance;
  }

  private init() {
    // Middlewares
    this.app.use(cors());
    this.app.use(express.json());

    // Rotas
    this.app.use("/filmes", filmesRoutes);
    this.app.use("/filmes", reviewsRoutes);

    // Health check
    this.app.get("/", (req, res) => {
      res.json({ 
        status: "ok", 
        message: "API de Filmes funcionando",
        timestamp: new Date().toISOString()
      });
    });

    // Middleware de erro global
    this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      console.error("Erro:", err.message);
      res.status(500).json({ 
        erro: "Erro interno do servidor",
        mensagem: process.env.NODE_ENV === "development" ? err.message : undefined
      });
    });
  }

  public listen(port = 3000) {
    this.app.listen(port, () => {
      console.log(`Servidor rodando em http://localhost:${port}`);
    });
  }
}

const server = AppServer.getInstance();
server.listen();

export default server;
