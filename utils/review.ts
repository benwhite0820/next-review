import { readFile } from 'fs/promises';
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

  return { title, image, date, html: sanitizeHtml };
};
