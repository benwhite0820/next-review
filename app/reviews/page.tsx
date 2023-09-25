import Link from 'next/link';
import React from 'react';

const Reviews = () => {
  return (
    <>
      <h1 className="text-4xl">Review Area</h1>
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
