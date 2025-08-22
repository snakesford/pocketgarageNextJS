"use client";

import SearchCars from "../components/SearchCars";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">Pocket Garage</h1>
        <SearchCars />
      </main>
    </QueryClientProvider>
  );
}