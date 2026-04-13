import filmes from "../data/filmes";
import { Filme } from "../types/Filme";

export function listarFilmes(): Filme[] {
    return filmes;
}

export function criarFilme(dados: Omit<Filme, "id">): Filme {
    const novoFilme: Filme = {
        id: Date.now(),
        ...dados
    };

    filmes.push(novoFilme);
    return novoFilme;
}

export function buscarPorId(id: number): Filme | undefined {
    return filmes.find(f => f.id === id);
}

export function deletarFilme(id: number): boolean {
    const index = filmes.findIndex(f => f.id === id);

    if (index === -1) return false;

    filmes.splice(index, 1);
    return true;
}