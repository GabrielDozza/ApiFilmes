import { Filme } from "../types/Filme";
import prisma from "../database/prisma";

interface PaginatedResult {
  data: Filme[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

class FilmesRepository {
  private static instance: FilmesRepository | null = null;

  private constructor() {}

  public static getInstance(): FilmesRepository {
    if (!FilmesRepository.instance) {
      FilmesRepository.instance = new FilmesRepository();
    }
    return FilmesRepository.instance;
  }

  public async listarFilmes(
    page: number = 1, 
    limit: number = 10, 
    busca?: string, 
    genero?: string
  ): Promise<PaginatedResult> {
    const skip = (page - 1) * limit;
    
    const where: any = {};
    
    if (busca) {
      where.OR = [
        { titulo: { contains: busca, mode: "insensitive" } },
        { diretor: { contains: busca, mode: "insensitive" } },
        { descricao: { contains: busca, mode: "insensitive" } }
      ];
    }
    
    if (genero) {
      where.genero = { contains: genero, mode: "insensitive" };
    }

    const [filmes, total] = await Promise.all([
      prisma.filme.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" }
      }),
      prisma.filme.count({ where })
    ]);

    return {
      data: filmes,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
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
