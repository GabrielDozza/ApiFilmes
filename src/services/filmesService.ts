import filmes from "../data/filmes";
import { Filme } from "../types/Filme";
import prisma from "../database/prisma";

export async function listarFilmes() {
    return await prisma.filme.findMany();
}
export async function criarFilme(dados: any) {
    return await prisma.filme.create({
        data: dados
    });
}

export function buscarPorId(id: number): Filme | undefined {
    return filmes.find(f => f.id === id);
}

export async function deletarFilme(id: number) {
    return await prisma.filme.delete({
        where: { id }
    });
}

export async function atualizarFilme(id: number, dados: any) {
    return await prisma.filme.update({
        where: { id },
        data: dados
    });
}