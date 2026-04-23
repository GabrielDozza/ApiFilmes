export interface Review {
    id: number;
    filmeId: number;
    comentario: string;
    nota: number;
    autor?: string;
    createdAt?: Date;
    updatedAt?: Date;
}