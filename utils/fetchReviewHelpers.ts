import {
  CACHE_TAGS,
  StrapiReviewType,
  StrapiReviewsApiType,
} from '@/types/review.types';
import qs from 'qs';

const CMS_URL = 'http://localhost:1337';

export async function fetchReviewData({
  filterFiled,
  filterParams,
  filterOperator = '$eq',
  searchField,
  sortField,
  pagination,
  fetchImage = true,
}: {
  filterFiled?: string;
  filterParams?: string;
  filterOperator?: string;
  searchField: string[];
  sortField?: string[];
  pagination?: Object;
  fetchImage?: boolean;
}) {
  const filterOptions =
    filterFiled && filterParams
      ? {
          filters: {
            [filterFiled]: {
              [filterOperator]: filterParams,
            },
          },
        }
      : {};

  const searchFieldOptions = searchField
    ? {
        fields: [...searchField],
      }
    : {};

  const sortFieldOptions = sortField
    ? {
        sort: sortField,
      }
    : {};

  const populateImage = fetchImage
    ? {
        populate: {
          image: {
            fields: ['url'],
          },
        },
      }
    : {};

  const queryDataUrl = qs.stringify({
    ...filterOptions,
    ...searchFieldOptions,
    ...sortFieldOptions,
    ...populateImage,
    pagination: {
      ...pagination,
    },
  });

  try {
    const url = `${CMS_URL}/api/reviews?${queryDataUrl}`;
    const response = await fetch(url, {
      next: {
        tags: [CACHE_TAGS.REVIEW],
      },
    });
    const data: StrapiReviewsApiType = await response.json();
    return data;
  } catch (error) {
    throw new Error(`something went wrong, please try again`);
  }
}

export function formattedReview({
  attributes: { slug, title, subtitle, image, publishedAt },
}: StrapiReviewType) {
  return {
    slug,
    title,
    subtitle,
    image: `${CMS_URL}${image.data.attributes.url}`,
    date: publishedAt.slice(0, 'yyyy-mm-dd'.length),
  };
}
