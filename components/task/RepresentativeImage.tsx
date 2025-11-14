'use client';

import Image from 'next/image';
import { useImageUpload } from '@/hooks/useImageUpload';

export const RepresentativeImage = () => {
  const {
    image,
    fileInputRef,
    handleSelectImage,
    handleFileChange,
  } = useImageUpload();

  return (
    <div className="w-full">
      <h2 className="mb-4 text-subtitle font-bold">대표 이미지</h2>

      {/* 파일 업로드 인풋 */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png"
        onChange={handleFileChange}
        className="hidden"
        aria-label="대표 이미지 파일 선택"
      />

      {/* 이미지 미리보기 or 업로드 UI */}
      {image?.preview ? (
        <button
          type="button"
          onClick={handleSelectImage}
          className="relative w-full aspect-square rounded-lg overflow-hidden border border-custom-gray-200 cursor-pointer hover:opacity-90 transition-opacity"
          aria-label="다른 이미지로 변경"
        >
          <Image
            src={image.preview}
            alt="대표 이미지 미리보기"
            fill
            priority
            className="object-cover"
          />
        </button>
      ) : (
        <div className="relative w-full aspect-square p-8 rounded-lg bg-custom-gray-100 border border-custom-gray-200 flex flex-col items-center justify-center gap-4">
          <p className="text-subtitle font-bold text-center">
            콘텐츠 대표 이미지를 등록해 주세요!
          </p>
          <p className="text-subtitle-small text-custom-gray-700 font-medium text-center">
            1:1 비율의 정사각형 이미지를 추천합니다
          </p>
          <button
            type="button"
            onClick={handleSelectImage}
            className="px-5 py-4 rounded-lg bg-custom-black-600 text-white text-lg font-medium hover:bg-custom-black-400 transition-colors cursor-pointer"
            aria-label="이미지 업로드"
          >
            이미지 업로드
          </button>
        </div>
      )}
    </div>
  );
};
