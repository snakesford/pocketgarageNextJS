"use client";

import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';

export default function SearchCars() {
    const [query, setQuery] = useState('');

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['cars', query],
        queryFn: ({ pageParam = 0 }) =>
            fetch(`/api/search?q=${query}&limit=100&offset=${pageParam}`)
                .then(res => res.json()),
        getNextPageParam: (lastPage, pages) => {
            const alreadyLoaded = pages.reduce((sum, page) => sum + page.results.length, 0);
            return alreadyLoaded < lastPage.total ? alreadyLoaded : undefined;
        }
    });

    const cars = data?.pages.flatMap(page => page.results) ?? [];

    return (
        <div className="p-4">
            <input
                className="border p-2 w-full"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search cars..."
            />
            <ul className="mt-4">
                {cars.map((car, i) => (
                    <li key={i} className="p-2 border-b">
                        {car.make} {car.model} ({car.year})
                    </li>
                ))}
            </ul>
            {hasNextPage && (
                <button
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                >
                    {isFetchingNextPage ? "Loading..." : "Load More"}
                </button>
            )}
        </div>
    );
}