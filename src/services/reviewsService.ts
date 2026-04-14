import reviews from "../data/reviews";
import { Review } from "../types/Review";

export function criarReview(
    filmeId: number,
    dados: Omit<Review, "id" | "filmeId">   
): Review {

    const novaReview: Review = {
        id: Date.now(),
        filmeId,
        ...dados
    };

    reviews.push(novaReview);
    return novaReview;
}

export function listarReviews(filmeId: number): Review[] {
    return reviews.filter(r => r.filmeId === filmeId);
}

export function deletarReview(id: number): boolean {
    const index = reviews.findIndex(r => r.id === id);

    if (index === -1) return false;

    reviews.splice(index, 1);
    return true;
}