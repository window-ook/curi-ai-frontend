'use client';

import Image from 'next/image';
import { useMultipleImageUpload } from '@/hooks/useMultipleImageUpload';

export const AdditionalImages = () => {
  const {
    images,
    fileInputRef,
    canAddMore,
    handleSelectImage,
    handleFileChange,
    handleReplaceImage,
  } = useMultipleImageUpload(4);

  return (
    <div className="w-full flex flex-col gap-4">
      <h2 className="text-subtitle font-bold text-custom-black-900">추가 이미지 (선택)</h2>
      <p className="text-xl text-custom-gray-800 font-medium">최대 4장까지 등록할 수 있어요</p>

      {/* 파일 업로드 인풋 */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png"
        multiple
        onChange={handleFileChange}
        className="hidden"
        aria-label="추가 이미지 파일 선택"
      />

      <div className="flex md:grid md:grid-cols-2 gap-2 overflow-x-auto md:overflow-x-visible">
        {/* 업로드된 이미지들 (8px 간격) */}
        {images.map((image, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleReplaceImage(index)}
            className="relative w-40 md:w-full aspect-square shrink-0 rounded-lg overflow-hidden border border-custom-gray-200 cursor-pointer hover:opacity-90 transition-opacity"
            aria-label={`추가 이미지 ${index + 1} 변경`}
          >
            <Image
              src={image.preview}
              alt={`추가 이미지 ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}

        {/* 빈 슬롯 */}
        {!images.length && (
          <button
            type="button"
            onClick={handleSelectImage}
            disabled={!canAddMore}
            className="w-40 md:w-full aspect-square rounded-lg border border-custom-gray-200 bg-custom-gray-100 flex items-center justify-center cursor-pointer hover:bg-custom-gray-200 transition-colors disabled:cursor-not-allowed disabled:hover:bg-custom-gray-100"
            aria-label="이미지 추가"
          >
            <Image
              src="/image/upload.webp"
              alt="이미지 업로드"
              width={48}
              height={48}
              className="size-12 object-contain"
            />
          </button>
        )}
      </div>
    </div>
  );
};
