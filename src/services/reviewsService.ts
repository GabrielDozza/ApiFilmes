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