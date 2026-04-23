export interface Filme {
    id: number;
    titulo: string;
    descricao: string;
    diretor: string;
    ano: number;
    genero: string;
    poster?: string;
    duracao?: number;
    createdAt?: Date;
    updatedAt?: Date;
}