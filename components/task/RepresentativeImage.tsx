'use client';

export const RepresentativeImage = () => {
  // 이미지 업로드 로직 추가 필요
  return (
    <div className="w-full">
      <h2 className="mb-4 text-subtitle font-bold custom-black-900">대표 이미지</h2>
      <div className="relative w-full aspect-square p-8 rounded-lg bg-custom-gray-100 border border-custom-gray-200 flex flex-col items-center justify-center">
        <p className="mb-2 text-subtitle text-custom-black-900 font-bold text-center">
          콘텐츠 대표 이미지를 등록해 주세요!
        </p>
        <p className="mb-6 text-subtitle-small text-custom-gray-700 font-medium text-center">
          1:1 비율의 정사각형 이미지를 추천합니다
        </p>
        <button
          type="button"
          className="px-5 py-4 rounded-lg bg-custom-black-600 text-white text-lg font-medium hover:bg-custom-black-400 transition-colors cursor-pointer"
        >
          이미지 업로드
        </button>
      </div>
    </div>
  );
};
