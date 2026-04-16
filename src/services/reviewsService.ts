import prisma from "../database/prisma";
import { Review } from "../types/Review";

export async function criarReview(
    filmeId: number,
    dados: Omit<Review, "id" | "filmeId">
) {
    return await prisma.review.create({
        data: {
            filmeId,
            ...dados
        }
    });
}

export async function listarReviews(filmeId: number) {
    return await prisma.review.findMany({
        where: { filmeId }
    });
}

export async function atualizarReview(
    id: number,
    dados: Partial<Omit<Review, "id" | "filmeId">>
) {
    try {
        return await prisma.review.update({
            where: { id },
            data: dados
        });
    } catch {
        return null;
    }
}

export async function deletarReview(id: number) {
    try {
        await prisma.review.delete({
            where: { id }
        });
        return true;
    } catch {
        return false;
    }
}
