import { Request, Response } from "express";
import * as reviewsService from "../services/reviewsService";
import * as filmesService from "../services/filmesService";

export async function listar(req: Request, res: Response) {
    const filmeId = Number(req.params.filmeId);
    const filme = await filmesService.buscarPorId(filmeId);

    if (!filme) {
        return res.status(404).json({ erro: "Filme não encontrado" });
    }

    const lista = await reviewsService.listarReviews(filmeId);
    res.json(lista);
}

export async function criar(req: Request, res: Response) {
    const filmeId = Number(req.params.filmeId);
    const { comentario, nota } = req.body;

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

    const review = await reviewsService.criarReview(filmeId, { comentario, nota });

    res.status(201).json(review);
}

export async function atualizar(req: Request, res: Response) {
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

export async function deletar(req: Request, res: Response) {
    const id = Number(req.params.id);

    const sucesso = await reviewsService.deletarReview(id);

    if (!sucesso) {
        return res.status(404).json({ erro: "Review não encontrada" });
    }

    res.status(204).send();
}
