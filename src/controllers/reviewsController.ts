import { Request, Response } from "express";
import * as reviewsService from "../services/reviewsService";
import * as filmesService from "../services/filmesService";

class ReviewsController {
  private static instance: ReviewsController | null = null;

  private constructor() {}

  public static getInstance(): ReviewsController {
    if (!ReviewsController.instance) {
      ReviewsController.instance = new ReviewsController();
    }
    return ReviewsController.instance;
  }

  public async listar(req: Request, res: Response) {
    const filmeId = Number(req.params.filmeId);
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const filme = await filmesService.buscarPorId(filmeId);

    if (!filme) {
      return res.status(404).json({ erro: "Filme não encontrado" });
    }

    const result = await reviewsService.listarReviews(filmeId, page, limit);
    res.json(result);
  }

  public async criar(req: Request, res: Response) {
    const filmeId = Number(req.params.filmeId);
    const { comentario, nota, autor } = req.body;

    const filme = await filmesService.buscarPorId(filmeId);
    if (!filme) {
      return res.status(404).json({ erro: "Filme não existe" });
    }

    if (!comentario || nota === undefined) {
      return res.status(400).json({ erro: "Campos obrigatórios" });
    }

    if (typeof nota !== "number") {
      return res.status(400).json({ erro: "Nota deve ser um número" });
    }

    // Validação de nota (0-10)
    if (nota < 0 || nota > 10) {
      return res.status(400).json({ erro: "Nota deve estar entre 0 e 10" });
    }

    const review = await reviewsService.criarReview(filmeId, { comentario, nota, autor });
    res.status(201).json(review);
  }

  public async atualizar(req: Request, res: Response) {
    const filmeId = Number(req.params.filmeId);
    const id = Number(req.params.id);
    const { comentario, nota, autor } = req.body;

    const filme = await filmesService.buscarPorId(filmeId);
    if (!filme) {
      return res.status(404).json({ erro: "Filme não encontrado" });
    }

    // Validação de nota (0-10)
    if (nota !== undefined) {
      if (typeof nota !== "number") {
        return res.status(400).json({ erro: "Nota deve ser um número" });
      }
      if (nota < 0 || nota > 10) {
        return res.status(400).json({ erro: "Nota deve estar entre 0 e 10" });
      }
    }

    const review = await reviewsService.atualizarReview(id, { comentario, nota, autor });
    if (!review) {
      return res.status(404).json({ erro: "Review não encontrada" });
    }

    res.json(review);
  }

  public async deletar(req: Request, res: Response) {
    const id = Number(req.params.id);

    const sucesso = await reviewsService.deletarReview(id);
    if (!sucesso) {
      return res.status(404).json({ erro: "Review não encontrada" });
    }

    res.status(204).send();
  }
}

const reviewsController = ReviewsController.getInstance();

export const listar = reviewsController.listar.bind(reviewsController);
export const criar = reviewsController.criar.bind(reviewsController);
export const atualizar = reviewsController.atualizar.bind(reviewsController);
export const deletar = reviewsController.deletar.bind(reviewsController);