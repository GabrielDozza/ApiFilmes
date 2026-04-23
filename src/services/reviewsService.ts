import reviewsRepository from "../repositories/reviewsRepository";

class ReviewsService {
  private static instance: ReviewsService | null = null;

  private constructor() {}

  public static getInstance(): ReviewsService {
    if (!ReviewsService.instance) {
      ReviewsService.instance = new ReviewsService();
    }
    return ReviewsService.instance;
  }

  public async criarReview(filmeId: number, dados: any) {
    return await reviewsRepository.criarReview(filmeId, dados);
  }

  public async listarReviews(filmeId: number, page: number = 1, limit: number = 10) {
    return await reviewsRepository.listarReviews(filmeId, page, limit);
  }

  public async atualizarReview(id: number, dados: any) {
    return await reviewsRepository.atualizarReview(id, dados);
  }

  public async deletarReview(id: number) {
    return await reviewsRepository.deletarReview(id);
  }
}

const reviewsService = ReviewsService.getInstance();

export const criarReview = reviewsService.criarReview.bind(reviewsService);
export const listarReviews = reviewsService.listarReviews.bind(reviewsService);
export const atualizarReview = reviewsService.atualizarReview.bind(reviewsService);
export const deletarReview = reviewsService.deletarReview.bind(reviewsService);
