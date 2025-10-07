"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ProductWithRelations, SearchAreaProps } from "@/types";

export default function SearchArea({ query, setQuery }: SearchAreaProps) {
  const [results, setResults] = useState<ProductWithRelations[]>([]);
  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      const res = await fetch(`/api/search?q=${query}`);
      const data = await res.json();
      setResults(data);
    };

    fetchData();
  }, [query]);

  return (
    <div className='absolute top-[50px] left-[20px] z-[100] h-[20rem] w-[95%] overflow-y-auto border border-gray-300 bg-white p-4 lg:top-[90px] lg:left-[180px] lg:w-[60%]'>
      <h2 className='text-center text-zinc-800'>Products </h2>
      {results.length > 0 ? (
        results.map((item) => (
          <Link
            key={item.id}
            href={`/products/${item.category.slug}/${item.subCategory.slug}/${item.id}`}
            className='block border-b-[1px] border-gray-300 p-2 text-sm tracking-wide transition hover:bg-gray-100'
            onClick={() => {
              setQuery("");
              setResults([]);
            }}
          >
            {item.description}
          </Link>
        ))
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}
