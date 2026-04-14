import { Request, Response } from "express";
import * as filmesService from "../services/filmesService";

export async function listar(req: Request, res: Response) {
    const filmes = await filmesService.listarFilmes();
    res.json(filmes);
}

export function criar(req: Request, res: Response) {
    const { titulo, descricao, diretor, ano, genero } = req.body;

    if (!titulo || !descricao || !diretor) {
        return res.status(400).json({ erro: "Campos obrigatórios" });
    }

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

export function atualizar(req: Request, res: Response) {
    const id = Number(req.params.id);
    const filme = filmesService.atualizarFilme(id, req.body);

    if (!filme) {
        return res.status(404).json({ erro: "Filme não encontrado" });
    }

    res.json(filme);
}