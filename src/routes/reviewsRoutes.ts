import { Router } from "express";
import * as reviewsController from "../controllers/reviewsController";

const router = Router();

router.get("/:filmeId/reviews", reviewsController.listar);
router.post("/:filmeId/reviews", reviewsController.criar);

export default router;