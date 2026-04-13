import { Request, Response } from "express";
import * as reviewsService from "../services/reviewsService";

export function listar(req: Request, res: Response) {
    const filmeId = Number(req.params.filmeId);

    const lista = reviewsService.listarReviews(filmeId);

    res.json(lista);
}
export function criar(req: Request, res: Response) {
    const filmeId = Number(req.params.filmeId);

    const review = reviewsService.criarReview(filmeId, req.body);

    res.status(201).json(review);
}