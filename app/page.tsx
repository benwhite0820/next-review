import Heading from '@/components/heading.component';
import { getAllReviews } from '@/lib/review';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Home = async () => {
  const { data: allGameCategories } = await getAllReviews({ pageSize: 3 });
  return (
    <>
      <Heading>Indie Gamer</Heading>
      <p className="pb-3">only the best indie games, reviewed for you</p>
      <ul className="flex flex-col gap-3">
        {allGameCategories.map(({ image, title, slug, subtitle }, index) => (
          <li
            key={slug}
            className="bg-white border rounded shadow w-80
               hover:shadow-xl sm:w-full"
          >
            <Link
              href={`/reviews/${slug}`}
              className="flex flex-col sm:flex-row"
            >
              <Image
                className="rounded-t sm:rounded-l sm:rounded-r-none"
                src={image}
                alt=""
                priority={index === 0}
                width="320"
                height="180"
              />
              <div className="px-2 py-1 text-center sm:text-left">
                <h2 className="font-orbitron font-semibold">{title}</h2>
                <p className="hidden pt-2 sm:block">{subtitle}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Home;
