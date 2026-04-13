import { Request, Response } from "express";
import * as filmesService from "../services/filmesService";

export function listar(req: Request, res: Response) {
    const lista = filmesService.listarFilmes();
    res.json(lista);
}

export function criar(req: Request, res: Response) {
    const filme = filmesService.criarFilme(req.body);
    res.status(201).json(filme);
}

export function deletar(req: Request, res: Response) {
    const id = Number(req.params.id);

    const sucesso = filmesService.deletarFilme(id);

    if (!sucesso) {
        return res.status(404).json({ erro: "Filme não encontrado" });
    }

    res.status(204).send();
}