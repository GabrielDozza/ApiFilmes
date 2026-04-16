import { Filme } from "../types/Filme";
import prisma from "../database/prisma";

class FilmesRepository {
  private static instance: FilmesRepository | null = null;

  private constructor() {}

  public static getInstance(): FilmesRepository {
    if (!FilmesRepository.instance) {
      FilmesRepository.instance = new FilmesRepository();
    }
    return FilmesRepository.instance;
  }

  public async listarFilmes(): Promise<Filme[]> {
    return await prisma.filme.findMany();
  }

  public async buscarPorId(id: number): Promise<Filme | null> {
    return await prisma.filme.findUnique({
      where: { id }
    });
  }

  public async criarFilme(dados: any) {
    return await prisma.filme.create({
      data: dados
    });
  }

  public async atualizarFilme(id: number, dados: any) {
    return await prisma.filme.update({
      where: { id },
      data: dados
    });
  }

  public async deletarFilme(id: number) {
    return await prisma.filme.delete({
      where: { id }
    });
  }
}

export default FilmesRepository.getInstance();
