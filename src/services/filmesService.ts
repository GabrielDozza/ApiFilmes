import { Filme } from "../types/Filme";
import prisma from "../database/prisma";

export async function listarFilmes(): Promise<Filme[]> {
    return await prisma.filme.findMany();
}

export async function criarFilme(dados: any) {
    return await prisma.filme.create({
        data: dados
    });
}

export async function buscarPorId(id: number): Promise<Filme | null> {
    return await prisma.filme.findUnique({
        where: { id }
    });
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