"use client";

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export default function SearchCars() {
    const [query, setQuery] = useState('');

    const { data } = useQuery({
        queryKey: ['cars', query],
        queryFn: () => fetch(`/api/search?q=${query}`).then(res => res.json()),
        // Always run, even if query is empty
    });

    return (
        <div className="p-4">
            <input
                className="border p-2 w-full"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search cars..."
            />
            <ul className="mt-4">
                {data?.map((car, i) => (
                    <li key={i} className="p-2 border-b">
                        {car.make} {car.model} ({car.year})
                    </li>
                ))}
            </ul>
        </div>
    );
}