'use client';

import Button from '@/components/shared/Button';
import Toast from '@/components/shared/Toast';
import { useState } from 'react';
import { useCategoryStore } from '@/store/useCategoryStore';
import { CATEGORIES, MAX_CATEGORY_COUNT } from '@/types/task/category';
import type { ICategory } from '@/types/task/category';

export default function CategorySelection() {
  const isSelecting = useCategoryStore((state) => state.isSelecting);
  const selectedCategories = useCategoryStore((state) => state.selectedCategories);
  const addCategory = useCategoryStore((state) => state.addCategory);
  const removeCategory = useCategoryStore((state) => state.removeCategory);
  const isSelected = useCategoryStore((state) => state.isSelected);
  const confirmSelection = useCategoryStore((state) => state.confirmSelection);

  const [showToast, setShowToast] = useState(false);

  const canProceed = selectedCategories.length > 0;

  const handleCategoryClick = (category: ICategory) => {
    if (isSelected(category.id)) removeCategory(category.id);
    else {
      if (selectedCategories.length >= MAX_CATEGORY_COUNT) {
        setShowToast(true);
        return;
      }
      addCategory(category);
    }
  };

  return (
    <>
      <main className="mx-auto flex w-full max-w-desktop flex-col gap-4 px-4 py-8">
        {/* 제목, 설명 */}
        <h1 className="text-subtitle font-bold">
          어떤 카테고리의
          <br />
          콘텐츠를 만드시나요?
        </h1>
        <p className="font-medium text-custom-gray-800">
          최대 2개까지 선택 가능합니다.
        </p>

        {/* 카테고리 그리드 */}
        <article className="grid grid-cols-2 gap-4">
          {CATEGORIES.map((category) => {
            const selected = isSelected(category.id);

            return (
              <Button
                type="button"
                key={category.id}
                onClick={() => handleCategoryClick(category)}
                className={`rounded-lg border px-5 py-4 text-center font-medium transition-colors`}
                variant={selected ? 'success-active' : 'outline'}
                size="lg"
                fullWidth={true}
              >
                {category.name}
              </Button>
            );
          })}
        </article>

        {/* 토스트 */}
        <Toast
          message="최대 2개까지만 선택 가능해요"
          isVisible={showToast}
          onClose={() => setShowToast(false)}
        />
      </main>

      <footer className="fixed md:hidden bottom-0 w-full border-t border-custom-gray-300 bg-white">
        <div className="mx-auto max-w-desktop px-5 py-4">
          <Button
            type="button"
            variant={isSelecting && canProceed ? 'success' : 'black'}
            size="lg"
            disabled={!isSelecting || !canProceed}
            disabledTextWhite={true}
            onClick={confirmSelection}
            className="block rounded-lg md:hidden"
            fullWidth={true}
          >
            다음으로
          </Button>
        </div>
      </footer>
    </>
  );
}
