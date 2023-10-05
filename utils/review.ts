import { readFile, readdir } from 'fs/promises';
import path from 'path';
import { sanitize } from 'isomorphic-dompurify';
import matter from 'gray-matter';
import { marked } from 'marked';

export const getReview = async (slug: string) => {
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
  const allReviewTitleArray = await readdir(
    path.join(process.cwd(), '/content/review')
  );

  const slugs = allReviewTitleArray
    .filter((title) => title.endsWith('.md'))
    .map((item) => item.slice(0, -3));

  const reviewsPromise = await Promise.allSettled(
    slugs.map(async (slug) => await getReview(slug))
  );

  const allReviews = reviewsPromise.flatMap((review) =>
    review.status === 'fulfilled' ? [review.value] : []
  );

  return allReviews;
};
