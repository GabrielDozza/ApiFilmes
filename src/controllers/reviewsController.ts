import { Request, Response } from "express";
import * as reviewsService from "../services/reviewsService";
import * as filmesService from "../services/filmesService";


export function listar(req: Request, res: Response) {
    const filmeId = Number(req.params.filmeId);

    const lista = reviewsService.listarReviews(filmeId);

    res.json(lista);
}
export function criar(req: Request, res: Response) {
    const filmeId = Number(req.params.filmeId);

    const filmeExiste = filmesService.buscarPorId(filmeId) !== undefined;

    if (!filmeExiste) {
        return res.status(404).json({ erro: "Filme não existe" });
    }

    const review = reviewsService.criarReview(filmeId, req.body);

    res.status(201).json(review);
}

export function deletar(req: Request, res: Response) {
    const id = Number(req.params.id);

    const sucesso = reviewsService.deletarReview(id);

    if (!sucesso) {
        return res.status(404).json({ erro: "Review não encontrada" });
    }

    res.status(204).send();
}