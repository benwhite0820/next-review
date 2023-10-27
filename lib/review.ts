import 'server-only';
import { sanitize } from 'isomorphic-dompurify';
import { marked } from 'marked';
import { Review, StrapiReviewPaginationType } from '@/types/review.types';
import { fetchReviewData, formattedReview } from '@/utils/fetchReviewHelpers';

type GetReviewArgs = {
  pageSize?: number;
  page?: number;
};

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
  pageSize,
  page,
}: GetReviewArgs): Promise<{
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

export async function getSearchReviews(
  query: string
): Promise<{ slug: string; title: string }[]> {
  const { data } = await fetchReviewData({
    filterFiled: 'title',
    filterParams: query,
    filterOperator: '$containsi',
    searchField: ['slug', 'title'],
    sortField: ['title'],
    pagination: {
      pageSize: 5,
    },
  });

  return data.map(({ attributes: { slug, title } }) => ({ slug, title }));
}
