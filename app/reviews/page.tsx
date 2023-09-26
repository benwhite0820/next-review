import Heading from '@/components/heading.component';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Reviews = () => {
  return (
    <>
      <Heading>Review Area</Heading>
      <ul className="flex flex-col gap-3">
        <li className="bg-white border rounded shadow w-80 transition-all hover:shadow-xl">
          <Link href="/reviews/hollow-knight">
            <Image
              src="/images/hollow-knight.jpg"
              alt="hollow knight image"
              width="320"
              height="180"
              className="rounded-t"
            />
            <h2 className="py-1 text-center">Hollow Knight</h2>
          </Link>
        </li>
        <li className="bg-white border rounded shadow w-80 transition-all hover:shadow-xl">
          <Link href="/reviews/stardew-valley">
            <Image
              src="/images/stardew-valley.jpg"
              alt="stardew valley image"
              width="320"
              height="180"
              className="rounded-t"
            />
            <h2 className="py-1 text-center">Stardew Valley</h2>
          </Link>
        </li>
      </ul>
    </>
  );
};

export default Reviews;
