'use client';

import Button from '@/components/shared/Button';
import Toast from '@/components/shared/Toast';
import { useState } from 'react';
import { useCategoryStore } from '@/store/useCategoryStore';
import { CATEGORIES, MAX_CATEGORY_COUNT } from '@/types/task/category';
import type { ICategory } from '@/types/task/category';

export default function CategorySelector() {
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
      <section className="px-4 py-8 mx-auto w-full max-w-desktop flex flex-col gap-4">
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
        <ul className="grid grid-cols-2 gap-4">
          {CATEGORIES.map((category) => {
            const selected = isSelected(category.id);

            return (
              <li key={category.id}>
                <Button
                  key={category.id}
                  type="button"
                  onClick={() => handleCategoryClick(category)}
                  className={`px-5 py-4 rounded-lg border text-center font-medium transition-colors`}
                  variant={selected ? 'success-active' : 'outline'}
                  size="lg"
                  fullWidth={true}
                  ariaLabel={`${category.name} 선택`}
                >
                  {category.name}
                </Button>
              </li>
            );
          })}
        </ul>

        {/* 토스트 */}
        <Toast
          message="최대 2개까지만 선택 가능해요"
          isVisible={showToast}
          onClose={() => setShowToast(false)}
        />
      </section>

      <footer className="fixed md:hidden bottom-0 w-full border-t border-custom-gray-300 bg-white">
        <div className="px-5 py-4 mx-auto max-w-desktop">
          <Button
            type="button"
            variant={isSelecting && canProceed ? 'success' : 'black'}
            size="lg"
            disabled={!isSelecting || !canProceed}
            disabledTextWhite={true}
            onClick={confirmSelection}
            className="block rounded-lg md:hidden"
            fullWidth={true}
            ariaLabel="다음으로 버튼(모바일)"
          >
            다음으로
          </Button>
        </div>
      </footer>
    </>
  );
}
