import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Heading = ({ children, className }: Props) => {
  return <h1 className={`font-bold pb-3 text-2xl ${className}`}>{children}</h1>;
};

export default Heading;
