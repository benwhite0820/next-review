import { StrapiReviewPaginationType } from '@/types/review.types';
import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import React from 'react';

type Props = {
  href: string;
  page: number;
  meta: StrapiReviewPaginationType;
};

const PaginationLink = ({
  children,
  href,
  disable = false,
}: {
  children: React.ReactNode;
  href: string;
  disable?: boolean;
}) => {
  if (disable) {
    return (
      <span className="border cursor-not-allowed rounded text-slate-500 text-sm transition-all hover:bg-orange-100 hover:text-slate-700 ">
        {children}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className="border rounded text-slate-500 text-sm transition-all hover:bg-orange-100 hover:text-slate-700 "
    >
      {children}
    </Link>
  );
};

const PaginationBar = ({
  href,
  page,
  meta: {
    pagination: { pageCount },
  },
}: Props) => {
  return (
    <div className="flex gap-2 pb-3">
      <PaginationLink href={`${href}?page=${page - 1}`} disable={!(page > 1)}>
        <ChevronLeftIcon className="h-5 w-5" />
        <span className="sr-only">Previous Page</span>
      </PaginationLink>
      <span>
        Page {page} of {pageCount}
      </span>
      <PaginationLink
        href={`${href}?page=${page + 1}`}
        disable={!(page !== pageCount && page < pageCount)}
      >
        <ChevronRightIcon className="h-5 w-5" />
        <span className="sr-only">Next Page</span>
      </PaginationLink>
    </div>
  );
};

export default PaginationBar;
