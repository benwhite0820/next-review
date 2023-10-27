'use client';

import React from 'react';
import { Combobox } from '@headlessui/react';
import { useDebounce } from 'use-debounce';
import { useIsClient } from '@/hooks/customHooks';
import { useRouter } from 'next/navigation';

type SearchReviewType = { slug: string; title: string };

const SearchBox = () => {
  const router = useRouter();
  const isClient = useIsClient();
  const [query, setQuery] = React.useState('');
  const [debouncedQuery] = useDebounce(query, 300);
  const [reviews, setReviews] = React.useState<SearchReviewType[]>([]);

  React.useEffect(() => {
    if (debouncedQuery.length > 1) {
      const controller = new AbortController();
      (async () => {
        const url = `/api/search?query=${encodeURIComponent(debouncedQuery)}`;
        const response = await fetch(url, { signal: controller.signal });
        const reviews = await response.json();
        setReviews(reviews);
      })();
      return () => controller.abort();
    }
    setReviews([]);
  }, [debouncedQuery]);

  const handleQueryOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleChangeRoutes = (value: string) => {
    router.push(`/reviews/${value}`);
  };

  const filtered = reviews
    .filter((item) =>
      item.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    )
    .slice(0, 5);

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
