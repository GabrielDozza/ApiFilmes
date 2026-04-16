import { Router } from "express";
import * as filmesController from "../controllers/filmesController";

const router = Router();

router.get("/", filmesController.listar);
router.get("/:id", filmesController.buscarPorId);
router.post("/", filmesController.criar);
router.delete("/:id", filmesController.deletar);
router.put("/:id", filmesController.atualizar);

export default router;
