import { readFile, readdir } from 'fs/promises';
import path from 'path';
import { sanitize } from 'isomorphic-dompurify';
import matter from 'gray-matter';
import { marked } from 'marked';
import { Review } from '@/types/review.types';

export const getSlugs = async () => {
  const allReviewTitleArray = await readdir(
    path.join(process.cwd(), '/content/review')
  );

  return allReviewTitleArray
    .filter((title) => title.endsWith('.md'))
    .map((item) => item.slice(0, -3));
};

export const getReview = async (slug: string): Promise<Review> => {
  const filePath = path.join(process.cwd(), `/content/review/${slug}.md`);
  const text = await readFile(filePath, 'utf-8');
  const {
    content,
    data: { title, image, date },
  } = matter(text);
  const htmlTemplate = marked(content);
  const sanitizeHtml = sanitize(htmlTemplate);

  return { slug, title, image, date, html: sanitizeHtml };
};

export const getAllReviews = async () => {
  const slugs = await getSlugs();

  const reviewsPromise = await Promise.allSettled(
    slugs.map(async (slug) => await getReview(slug))
  );

  const allReviews = reviewsPromise
    .flatMap((review) => (review.status === 'fulfilled' ? [review.value] : []))
    .sort((a, b) => b.date.localeCompare(a.date));

  console.log(
    reviewsPromise.flatMap((review) =>
      review.status === 'fulfilled' ? [review.value] : []
    )
  );

  return allReviews;
};
