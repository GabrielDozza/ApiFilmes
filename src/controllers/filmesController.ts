import { Request, Response } from "express";
import * as filmesService from "../services/filmesService";

class FilmesController {
  private static instance: FilmesController | null = null;

  private constructor() {}

  public static getInstance(): FilmesController {
    if (!FilmesController.instance) {
      FilmesController.instance = new FilmesController();
    }
    return FilmesController.instance;
  }

  public async listar(req: Request, res: Response) {
    const filmes = await filmesService.listarFilmes();
    res.json(filmes);
  }

  public async buscarPorId(req: Request, res: Response) {
    const id = Number(req.params.id);
    const filme = await filmesService.buscarPorId(id);

    if (!filme) {
      return res.status(404).json({ erro: "Filme não encontrado" });
    }

    res.json(filme);
  }

  public async criar(req: Request, res: Response) {
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

  public async deletar(req: Request, res: Response) {
    const id = Number(req.params.id);

    try {
      await filmesService.deletarFilme(id);
      res.status(204).send();
    } catch {
      res.status(404).json({ erro: "Filme não encontrado" });
    }
  }

  public async atualizar(req: Request, res: Response) {
    const id = Number(req.params.id);

    try {
      const filme = await filmesService.atualizarFilme(id, req.body);
      res.json(filme);
    } catch {
      res.status(404).json({ erro: "Filme não encontrado" });
    }
  }
}

const filmesController = FilmesController.getInstance();

export const listar = filmesController.listar.bind(filmesController);
export const buscarPorId = filmesController.buscarPorId.bind(filmesController);
export const criar = filmesController.criar.bind(filmesController);
export const deletar = filmesController.deletar.bind(filmesController);
export const atualizar = filmesController.atualizar.bind(filmesController);
