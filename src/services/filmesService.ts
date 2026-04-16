import { Filme } from "../types/Filme";
import filmesRepository from "../repositories/filmesRepository";

class FilmesService {
  private static instance: FilmesService | null = null;

  private constructor() {}

  public static getInstance(): FilmesService {
    if (!FilmesService.instance) {
      FilmesService.instance = new FilmesService();
    }
    return FilmesService.instance;
  }

  public async listarFilmes(): Promise<Filme[]> {
    return await filmesRepository.listarFilmes();
  }

  public async criarFilme(dados: any) {
    return await filmesRepository.criarFilme(dados);
  }

  public async buscarPorId(id: number): Promise<Filme | null> {
    return await filmesRepository.buscarPorId(id);
  }

  public async deletarFilme(id: number) {
    return await filmesRepository.deletarFilme(id);
  }

  public async atualizarFilme(id: number, dados: any) {
    return await filmesRepository.atualizarFilme(id, dados);
  }
}

const filmesService = FilmesService.getInstance();

export const listarFilmes = filmesService.listarFilmes.bind(filmesService);
export const criarFilme = filmesService.criarFilme.bind(filmesService);
export const buscarPorId = filmesService.buscarPorId.bind(filmesService);
export const deletarFilme = filmesService.deletarFilme.bind(filmesService);
export const atualizarFilme = filmesService.atualizarFilme.bind(filmesService);
