import "dotenv/config";
import express, { Application } from "express";
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
    console.log("DATABASE_URL:", process.env.DATABASE_URL);
    this.app.use(express.json());
    this.app.use("/filmes", filmesRoutes);
    this.app.use("/filmes", reviewsRoutes);
    this.app.get("/", (req, res) => {
      res.send("API funcionando");
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
