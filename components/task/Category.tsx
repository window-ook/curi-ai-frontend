'use client';

import Image from 'next/image';

export const Category = () => {
  return (
    <div className="w-full">
      <h2 className="mb-4 text-subtitle font-bold">카테고리</h2>
      <div className="relative">
        <input
          type="text"
          placeholder="주제를 선택해주세요"
          readOnly
          className="w-full px-4 py-4 rounded-lg border border-custom-gray-200 bg-white placeholder:text-custom-gray-700 cursor-pointer"
        />
        <Image
          src="/image/chevron-right.webp"
          alt="카테고리 주제 선택"
          width={24}
          height={24}
          className="absolute right-4 top-1/2 -translate-y-1/2  pointer-events-none"
        />
      </div>
    </div>
  );
};
