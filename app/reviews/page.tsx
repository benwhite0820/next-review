import Heading from '@/components/heading.component';
import PaginationBar from '@/components/paginationBar.component';
import { parsePageParam } from '@/lib/pagination';
import { getAllReviews } from '@/lib/review';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const metadata = {
  title: 'Review',
};

export type Props = {
  searchParams: {
    page: string;
  };
};

const Reviews = async ({ searchParams }: Props) => {
  const page = parsePageParam(searchParams.page);
  const { data, meta } = await getAllReviews({ page });

  return (
    <>
      <Heading>Reviews</Heading>
      <PaginationBar href="/reviews" page={page} meta={meta} />
      <ul className="flex flex-row flex-wrap gap-3">
        {data.map(({ title, image, slug }, index) => {
          return (
            <li
              className="bg-white border rounded shadow w-80 transition-all hover:shadow-xl"
              key={title}
            >
              <Link href={`/reviews/${slug}`}>
                <Image
                  className="rounded-t"
                  src={image}
                  alt={title}
                  width="320"
                  height="180"
                  priority={index === 0}
                />
                <h2 className="font-semibold font-orbitron py-1 text-center">
                  {title}
                </h2>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Reviews;
