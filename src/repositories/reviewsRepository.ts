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

  public async listarReviews(filmeId: number, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
        where: { filmeId },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" }
      }),
      prisma.review.count({ where: { filmeId } })
    ]);

    return {
      data: reviews,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
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
