'use client';

import Image from 'next/image';

export const AdditionalImages = () => {
  return (
    <div className="w-full mt-8">
      <h2 className="mb-2 text-subtitle font-bold custom-black-900">추가 이미지 (선택)</h2>
      <p className="mb-4 text-xl text-custom-gray-800 font-medium">최대 4장까지 등록할 수 있어요</p>
      <div className="flex gap-3">
        <div className="w-1/2 h-auto aspect-square bg-custom-gray-100 border border-custom-gray-200 rounded-lg flex items-center justify-center cursor-pointer hover:bg-custom-gray-200 transition-colors">
          <Image
            src="/image/upload.webp"
            alt="이미지 업로드"
            width={48}
            height={48}
            className="w-1/5 h-1/5 object-cover"
          />
        </div>
      </div>
    </div>
  );
};