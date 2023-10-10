import Heading from '@/components/heading.component';
import { getAllReviews } from '@/lib/review';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const metadata = {
  title: 'Review',
};

const Reviews = async () => {
  const value = await getAllReviews();

  return (
    <>
      <Heading>Reviews</Heading>
      <ul className="flex flex-row flex-wrap gap-3">
        {value.map(({ title, image, slug }) => {
          return (
            <li
              className="bg-white border rounded shadow w-80 transition-all hover:shadow-xl"
              key={title}
            >
              <Link href={`/reviews/${slug}`}>
                <Image
                  src={image}
                  alt={title}
                  width="320"
                  height="180"
                  className="rounded-t"
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
