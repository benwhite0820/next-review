import { readdir } from 'fs/promises';
import path from 'path';
import { sanitize } from 'isomorphic-dompurify';
import { marked } from 'marked';
import { Review } from '@/types/review.types';
import { fetchReviewData, formattedReview } from '@/utils/fetchReviewHelpers';

export const getSlugs = async () => {
  const data = await fetchReviewData({
    searchField: ['slug'],
    sortField: ['publishedAt:desc'],
    pagination: {
      pageSize: 100,
    },
  });

  return data;
};

export async function getReview(slugParam: string): Promise<Review> {
  const [data] = await fetchReviewData({
    filterFiled: 'slug',
    filterParams: slugParam,
    searchField: ['slug', 'title', 'subtitle', 'publishedAt', 'body'],
    pagination: {
      pageSize: 1,
      withCount: false,
    },
  });

  const { attributes } = data;

  const htmlTemplate = marked(attributes.body || '');
  const sanitizeHtml = sanitize(htmlTemplate);

  return {
    ...formattedReview(data),
    html: sanitizeHtml,
  };
}

export async function getAllReviews(): Promise<Omit<Review, 'html'>[]> {
  const data = await fetchReviewData({
    sortField: ['publishedAt:desc'],
    searchField: ['slug', 'title', 'subtitle', 'publishedAt'],
    pagination: {
      pageSize: 6,
    },
  });

  console.log(data);
  return data.map((item) => formattedReview(item));
}
