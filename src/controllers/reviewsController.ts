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
    const filme = await filmesService.buscarPorId(filmeId);

    if (!filme) {
      return res.status(404).json({ erro: "Filme n�o encontrado" });
    }

    const lista = await reviewsService.listarReviews(filmeId);
    res.json(lista);
  }

  public async criar(req: Request, res: Response) {
    const filmeId = Number(req.params.filmeId);
    const { comentario, nota } = req.body;

    const filme = await filmesService.buscarPorId(filmeId);
    if (!filme) {
      return res.status(404).json({ erro: "Filme n�o existe" });
    }

    if (!comentario || nota === undefined) {
      return res.status(400).json({ erro: "Campos obrigat�rios" });
    }

    if (typeof nota !== "number") {
      return res.status(400).json({ erro: "Nota deve ser um n�mero" });
    }

    const review = await reviewsService.criarReview(filmeId, { comentario, nota });
    res.status(201).json(review);
  }

  public async atualizar(req: Request, res: Response) {
    const filmeId = Number(req.params.filmeId);
    const id = Number(req.params.id);

    const filme = await filmesService.buscarPorId(filmeId);
    if (!filme) {
      return res.status(404).json({ erro: "Filme não encontrado" });
    }

    const review = await reviewsService.atualizarReview(id, req.body);
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
