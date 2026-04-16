import prisma from "../database/prisma";
import { Review } from "../types/Review";

class ReviewsRepository {
  private static instance: ReviewsRepository | null = null;

  private constructor() {}

  public static getInstance(): ReviewsRepository {
    if (!ReviewsRepository.instance) {
      ReviewsRepository.instance = new ReviewsRepository();
    }
    return ReviewsRepository.instance;
  }

  public async criarReview(
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

  public async listarReviews(filmeId: number) {
    return await prisma.review.findMany({
      where: { filmeId }
    });
  }

  public async atualizarReview(
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

  public async deletarReview(id: number) {
    try {
      await prisma.review.delete({
        where: { id }
      });
      return true;
    } catch {
      return false;
    }
  }
}

export default ReviewsRepository.getInstance();
