import Heading from '@/components/heading.component';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Home = () => {
  return (
    <>
      <Heading>Indie Gamer</Heading>
      <p className="pb-3">only the best indie games, reviewed for you</p>
      <div className="bg-white border rounded shadow transition-all hover:shadow-xl w-80 sm:w-full">
        <Link
          className="flex flex-col sm:flex-row"
          href="/reviews/stardew-valley"
        >
          <Image
            src="/images/stardew-valley.jpg"
            alt="stardew valley image"
            width="320"
            height="180"
            className="rounded-t sm:rounded-l sm:rounded-r-none"
          />
          <h2 className="font-semibold font-orbitron py-1 text-center sm:px-2">
            Stardew Valley
          </h2>
        </Link>
      </div>
    </>
  );
};

export default Home;
