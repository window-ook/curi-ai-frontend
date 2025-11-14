'use client';

import Image from 'next/image';
import Button from '@/components/shared/Button';
import { useCategoryStore } from '@/store/useCategoryStore';

export const Navbar = () => {
  const isSelecting = useCategoryStore((state) => state.isSelecting);
  const selectedCategories = useCategoryStore((state) => state.selectedCategories);
  const cancelSelection = useCategoryStore((state) => state.cancelSelection);
  const confirmSelection = useCategoryStore((state) => state.confirmSelection);

  const canProceed = selectedCategories.length > 0;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-custom-gray-300 bg-white">
      <div className="relative mx-auto flex h-full max-w-desktop items-center justify-between px-5">
        {isSelecting && (
          <>
            <Button
              type="button"
              variant="outline"
              size="navbar"
              onClick={cancelSelection}
              className="absolute left-5 hidden w-30 md:block"
            >
              나가기
            </Button>
            <Button
              type="button"
              variant="black"
              size="navbar"
              onClick={cancelSelection}
              className="absolute left-0 block md:hidden bg-white"
            >
              <Image
                src="/image/x.webp"
                width={24}
                height={24}
                alt="카테고리 선택 취소"
              />
            </Button>
          </>
        )}
        <h1 className="flex-1 text-center text-2xl font-bold">
          {isSelecting ? '카테고리' : '과제'}
        </h1>
        <Button
          type="button"
          variant={isSelecting && canProceed ? 'success' : 'black'}
          size="navbar"
          disabled={!isSelecting || !canProceed}
          disabledTextWhite={true}
          onClick={confirmSelection}
          className="absolute right-5 hidden w-30 md:block"
        >
          다음으로
        </Button>
      </div>
    </header>
  );
};
