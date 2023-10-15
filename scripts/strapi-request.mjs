import { writeFileSync } from 'node:fs';
import path from 'node:path';
import qs from 'qs';

const queryDataUrl = qs.stringify(
  {
    filters: {
      slug: {
        $eq: 'hades-2018',
      },
    },
    fields: ['slug', 'title', 'subtitle', 'publishedAt', 'body', 'image'],
    populate: {
      image: {
        fields: ['url'],
      },
    },
    pagination: {
      pageSize: 1,
      withCount: false,
    },
  },
  {
    encodeValueOnly: true,
  }
);

const url = `http://localhost:1337/api/reviews?${queryDataUrl}`;

const response = await fetch(url);
const body = await response.json();
const formatted = JSON.stringify(body, null, 2);
const file = path.join(process.cwd(), 'strapi-response.json');

try {
  writeFileSync(file, formatted, 'utf-8');
  console.log('success');
} catch (error) {
  console.log(error);
}
