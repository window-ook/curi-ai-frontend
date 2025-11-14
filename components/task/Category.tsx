'use client';

import Image from 'next/image';
import { useCategoryStore } from '@/store/useCategoryStore';

export const Category = () => {
  const { selectedCategories, openSelection } = useCategoryStore();

  const displayText = selectedCategories.length > 0
    ? selectedCategories.map((c) => c.name).join(', ')
    : '주제를 선택해주세요';

  return (
    <div className="w-full">
      <h2 className="mb-4 text-subtitle font-bold">카테고리</h2>
      <div className="relative" onClick={openSelection}>
        <input
          type="text"
          value={displayText}
          readOnly
          placeholder="주제를 선택해주세요"
          className="w-full cursor-pointer rounded-lg border border-custom-gray-200 bg-white px-4 py-4 placeholder:text-custom-gray-700"
        />
        <Image
          src="/image/chevron-right.webp"
          alt="카테고리 주제 선택"
          width={24}
          height={24}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
        />
      </div>
    </div>
  );
};
