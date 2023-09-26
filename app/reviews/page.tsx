import Heading from '@/components/heading.component';
import Link from 'next/link';
import React from 'react';

const Reviews = () => {
  return (
    <>
      <Heading>Review Area</Heading>
      <ul>
        <li>
          <Link href="/reviews/hollow-knight">Hollow Knight</Link>
        </li>
        <li>
          <Link href="/reviews/stardew-valley">Stardew Valley</Link>
        </li>
      </ul>
    </>
  );
};

export default Reviews;
