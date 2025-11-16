'use client';

import Button from '@/components/ui/Button';
import { useCategoryStore } from '@/store/useCategoryStore';

export const Navbar = () => {
  const isSelecting = useCategoryStore((state) => state.isSelecting);
  const selectedCategories = useCategoryStore((state) => state.selectedCategories);
  const cancelSelection = useCategoryStore((state) => state.cancelSelection);
  const confirmSelection = useCategoryStore((state) => state.confirmSelection);

  const canProceed = selectedCategories.length > 0;

  return (
    <nav
      role="navigation"
      aria-label="네비게이션 바"
      className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-custom-gray-300 bg-white">
      <div className="relative h-full max-w-desktop mx-auto px-5 flex items-center justify-between">
        {isSelecting && (
          <>
            <Button
              type="button"
              variant="outline"
              size="navbar"
              onClick={cancelSelection}
              className="hidden md:block absolute left-5 w-30"
              ariaLabel="나가기 버튼(PC)"
            >
              나가기
            </Button>
            <Button
              type="button"
              variant="black"
              size="navbar"
              onClick={cancelSelection}
              className="block md:hidden absolute left-0 bg-white"
              ariaLabel="나가기 버튼(모바일)"
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#121212" strokeWidth="2">
                <path d="M19 5L5 19M5 5l14 14" />
              </svg>
            </Button>
          </>
        )}
        <h1 className="flex-1 text-2xl text-center font-bold text-custom-black-900">
          {isSelecting ? '카테고리' : '과제'}
        </h1>
        <Button
          type="button"
          variant={isSelecting && canProceed ? 'success' : 'black'}
          size="navbar"
          disabled={!isSelecting || !canProceed}
          disabledTextWhite={true}
          onClick={confirmSelection}
          className="hidden md:block absolute right-5 w-30"
          ariaLabel="다음으로 버튼(PC)"
        >
          다음으로
        </Button>
      </div>
    </nav>
  );
};
