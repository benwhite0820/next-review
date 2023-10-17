import { sanitize } from 'isomorphic-dompurify';
import { marked } from 'marked';
import { Review, StrapiReviewPaginationType } from '@/types/review.types';
import { fetchReviewData, formattedReview } from '@/utils/fetchReviewHelpers';

export const getSlugs = async () => {
  const { data } = await fetchReviewData({
    searchField: ['slug'],
    sortField: ['publishedAt:desc'],
    pagination: {
      pageSize: 100,
    },
  });

  return data;
};

export async function getReview(slugParam: string): Promise<Review | null> {
  const { data } = await fetchReviewData({
    filterFiled: 'slug',
    filterParams: slugParam,
    searchField: ['slug', 'title', 'subtitle', 'publishedAt', 'body'],
    pagination: {
      pageSize: 1,
      withCount: false,
    },
  });

  if (!data) return null;

  const { attributes } = data[0];

  const htmlTemplate = marked(attributes.body || '');
  const sanitizeHtml = sanitize(htmlTemplate);

  return {
    ...formattedReview(data[0]),
    html: sanitizeHtml,
  };
}

export async function getAllReviews({
  pageSize = 6,
  page,
}: {
  pageSize?: number;
  page?: number;
}): Promise<{
  data: Omit<Review, 'html'>[];
  meta: StrapiReviewPaginationType;
}> {
  const { data, meta } = await fetchReviewData({
    sortField: ['publishedAt:desc'],
    searchField: ['slug', 'title', 'subtitle', 'publishedAt'],
    pagination: {
      pageSize,
      page,
    },
  });

  return { data: data.map((item) => formattedReview(item)), meta };
}
