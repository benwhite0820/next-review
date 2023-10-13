import Heading from '@/components/heading.component';
import { getAllReviews } from '@/lib/review';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Home = async () => {
  const allGameCategories = await getAllReviews();
  return (
    <>
      <Heading>Indie Gamer</Heading>
      <p className="pb-3">only the best indie games, reviewed for you</p>
      {allGameCategories.map(({ image, title, slug }) => {
        return (
          <div
            className="bg-white border rounded shadow transition-all hover:shadow-xl w-80 sm:w-full my-3"
            key={title}
          >
            <Link
              className="flex flex-col sm:flex-row"
              href={`/reviews/${slug}`}
            >
              <img
                src={image}
                alt={`${title} image`}
                width="320"
                height="180"
                className="rounded-t sm:rounded-l sm:rounded-r-none"
              />
              <h2 className="font-semibold font-orbitron py-1 text-center sm:px-2">
                {title}
              </h2>
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default Home;
