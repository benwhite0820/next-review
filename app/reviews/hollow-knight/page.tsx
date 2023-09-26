import Heading from '@/components/heading.component';
import Image from 'next/image';
import React from 'react';

const HollowKinghtPage = () => {
  return (
    <>
      <Heading>HollowKinghtPage</Heading>
      <Image
        src="/images/hollow-knight.jpg"
        alt="hollow knight image"
        width="640"
        height="360"
        className="mb-2 rounded"
      />
      <div>This will be the review for Stardew Valley</div>
    </>
  );
};

export default HollowKinghtPage;
