import { Request, Response } from "express";
import * as filmesService from "../services/filmesService";

export async function listar(req: Request, res: Response) {
    const filmes = await filmesService.listarFilmes();
    res.json(filmes);
}

export async function buscarPorId(req: Request, res: Response) {
    const id = Number(req.params.id);
    const filme = await filmesService.buscarPorId(id);

    if (!filme) {
        return res.status(404).json({ erro: "Filme não encontrado" });
    }

    res.json(filme);
}

export async function criar(req: Request, res: Response) {
    const { titulo, descricao, diretor, ano, genero } = req.body;

    if (!titulo || !descricao || !diretor || ano === undefined || !genero) {
        return res.status(400).json({ erro: "Campos obrigatórios" });
    }

    if (typeof ano !== "number") {
        return res.status(400).json({ erro: "Ano deve ser um número" });
    }

    const filme = await filmesService.criarFilme({ titulo, descricao, diretor, ano, genero });

    res.status(201).json(filme);
}

export async function deletar(req: Request, res: Response) {
    const id = Number(req.params.id);

    try {
        await filmesService.deletarFilme(id);
        res.status(204).send();
    } catch {
        res.status(404).json({ erro: "Filme não encontrado" });
    }
}

export async function atualizar(req: Request, res: Response) {
    const id = Number(req.params.id);

    try {
        const filme = await filmesService.atualizarFilme(id, req.body);
        res.json(filme);
    } catch {
        res.status(404).json({ erro: "Filme não encontrado" });
    }
}
