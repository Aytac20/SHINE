"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
interface FilterProps {
  mainCategory?: { id: string; name: string; slug: string };
  subCategories?: { id: string; name: string; slug: string }[];
  colors?: string[];
  onClose?: () => void; 
}
const Filter: React.FC<FilterProps> = ({
  mainCategory = { id: "", name: "", slug: "" },
  subCategories = [],
  colors = [],
  onClose,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  // Sync URL params with state
  useEffect(() => {
    const urlColors = searchParams.get("colors")?.split(",") || [];
    setSelectedColors(urlColors);
  }, [searchParams]);

  const toggleColor = (color: string) => {
    const newColors = selectedColors.includes(color)
      ? selectedColors.filter((c) => c !== color)
      : [...selectedColors, color];

    setSelectedColors(newColors);

    const params = new URLSearchParams(searchParams.toString());
    if (newColors.length > 0) {
      params.set("colors", newColors.join(","));
    } else {
      params.delete("colors");
    }

    router.replace(`${window.location.pathname}?${params.toString()}`);
  };

  return (
    <div className="px-6 space-y-4  lg:fixed top-[150px] mb-8  bg-white text-xs h-[calc(100vh-160px)] overflow-y-auto ">
      {/* Subcategories */}
      <div className="mr-2">
        <p className="pl-2 pb-4 font-semibold">{mainCategory.name}</p>
        {subCategories.map((sub) => (
          <div
            key={sub.id}
            className="flex justify-between cursor-pointer py-1 capitalize text-gray-800 tracking-wider hover:bg-gray-100 px-2 rounded my-2"
          >
            <Link
              href={`/products/${mainCategory.slug}/${sub.slug}`}
              onClick={onClose} // Close mobile sheet on click
            >
              {sub.name.toLowerCase()}
            </Link>
          </div>
        ))}
      </div>

      <hr className="my-2 border-gray-200" />

      {/* Colors */}
      <div>
        <p className="pl-2 pb-2 font-semibold">Color</p>
        <ul className="space-y-2 text-gray-600 text-sm mb-6 mx-3">
          {colors.map((color) => (
            <li
              key={color}
              className="flex items-center space-x-2 cursor-pointer hover:text-gray-900 capitalize text-xs"
            >
              <input
                type="checkbox"
                id={`color-${color}`}
                checked={selectedColors.includes(color)}
                onChange={() => toggleColor(color)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor={`color-${color}`} className="select-none">
                {color}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Filter;
