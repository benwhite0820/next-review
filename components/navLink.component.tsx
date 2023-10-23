'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

type Props = {
  children: React.ReactNode;
  href: string;
  prefetch?: boolean;
};

const NavLink = ({ href, children, prefetch = true }: Props) => {
  const path = usePathname();

  return (
    <>
      {href === path ? (
        <span className="text-orange-800">{children}</span>
      ) : (
        <Link
          className="text-orange-800 hover:underline"
          href={href}
          prefetch={prefetch}
        >
          {children}
        </Link>
      )}
    </>
  );
};

export default NavLink;
