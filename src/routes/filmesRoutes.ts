import { Router } from "express";
import * as filmesController from "../controllers/filmesController";

const router = Router();

router.get("/", filmesController.listar);
router.post("/", filmesController.criar);

export default router;