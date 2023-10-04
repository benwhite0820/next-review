import { readFile } from 'fs/promises';
import path from 'path';
import { sanitize } from 'isomorphic-dompurify';
import React from 'react';
import Image from 'next/image';
import { marked } from 'marked';
import Heading from '@/components/heading.component';

const StardewVallyPage = async () => {
  const currentDirectory = process.cwd();
  const filePath = path.join(
    currentDirectory,
    '/content/review/stardew-valley.md'
  );
  const text = await readFile(filePath, 'utf-8');
  const html = marked(text);
  const sanitizeHtml = sanitize(html);
  return (
    <>
      <Heading>StardewVallyPage</Heading>
      <Image
        src="/images/stardew-valley.jpg"
        alt="stardew valley image"
        width="640"
        height="360"
        className="mb-2 rounded"
      />
      <article
        className="prose prose-slate max-w-screen-sm"
        dangerouslySetInnerHTML={{ __html: sanitizeHtml }}
      />
    </>
  );
};

export default StardewVallyPage;
