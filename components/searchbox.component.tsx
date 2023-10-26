'use client';

import React from 'react';
import { Combobox } from '@headlessui/react';
import { useIsClient } from '@/hooks/customHooks';
import { useRouter } from 'next/navigation';

const dummyData = [
  {
    slug: 'hades-2018',
    title: 'Hades',
  },
  {
    slug: 'fall-guys',
    title: 'Fall Guys: Ultimate Knockout',
  },
  {
    slug: 'black-mesa',
    title: 'Black Mesa',
  },
  {
    slug: 'disco-elysium',
    title: 'Disco Elysium',
  },
  {
    slug: 'dead-cells',
    title: 'Dead Cells',
  },
  {
    slug: 'a-way-out-2018',
    title: 'A Way Out',
  },
];

const SearchBox = () => {
  const router = useRouter();
  const isClient = useIsClient();
  const [query, setQuery] = React.useState('');

  const handleQueryOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleChangeRoutes = (value: string) => {
    router.push(`/reviews/${value}`);
  };

  const filtered = dummyData.filter((item) => item.title.includes(query));

  if (!isClient) return <input placeholder="search..." />;

  return (
    <div className="relative w-48">
      <Combobox onChange={handleChangeRoutes}>
        <Combobox.Input
          className="border px-2 py-1 rounded w-full"
          placeholder="search..."
          onChange={handleQueryOnChange}
        />
        <Combobox.Options className="absolute bg-white py-1 w-full">
          {filtered.map(({ slug, title }) => (
            <Combobox.Option key={slug} value={slug}>
              {({ active }) => (
                <span
                  className={`block px-2 truncate w-full ${
                    active ? 'bg-orange-100' : ''
                  }`}
                >
                  {title}
                </span>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </div>
  );
};

export default SearchBox;
