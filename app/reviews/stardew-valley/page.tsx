import Heading from '@/components/heading.component';
import Image from 'next/image';
import React from 'react';

const StardewVallyPage = () => {
  return (
    <>
      <Heading>StardewVallyPage</Heading>
      <Image
        src="/images/stardew-valley.jpg"
        alt="stardew valley image"
        width="640"
        height="360"
        className="mb-2 rounded"
      />
      <div>This will be the review for Stardew Valley</div>
    </>
  );
};

export default StardewVallyPage;
