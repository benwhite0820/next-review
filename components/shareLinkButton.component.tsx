'use client';

import { LinkIcon } from '@heroicons/react/20/solid';
import React from 'react';

const ShareLinkButton = () => {
  const [clicked, setClicked] = React.useState(false);
  const handleOnClick = () => {
    navigator.clipboard.writeText(window.location.href);
    setClicked(true);
    setTimeout(() => setClicked(false), 1500);
  };
  return (
    <button
      className="border flex gap-1 items-center px-2 py-1 rounder text-sm text-slate-500 transition-all hover:bg-orange-200 hover:text-slate-700"
      onClick={handleOnClick}
    >
      <LinkIcon className="h-4 w-4" />
      {clicked ? 'Link copied' : 'Share link'}
    </button>
  );
};

export default ShareLinkButton;
