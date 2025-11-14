import { create } from 'zustand';
import { MAX_CATEGORY_COUNT } from '@/types/task/category';
import type { ICategoryStore } from '@/types/task/category';

/**
 * 카테고리 선택 상태 관리 스토어
 */
export const useCategoryStore = create<ICategoryStore>((set, get) => ({
  selectedCategories: [],
  isSelecting: false,

  openSelection: () => set({ isSelecting: true }),

  addCategory: (category) => {
    const { selectedCategories } = get();

    if (selectedCategories.length >= MAX_CATEGORY_COUNT) return;
    if (selectedCategories.some((c) => c.id === category.id)) return;

    set({ selectedCategories: [...selectedCategories, category] });
  },

  removeCategory: (categoryId) => {
    const { selectedCategories } = get();

    set({ selectedCategories: selectedCategories.filter((c) => c.id !== categoryId) });
  },

  isSelected: (categoryId) => {
    const { selectedCategories } = get();
    return selectedCategories.some((c) => c.id === categoryId);
  },

  confirmSelection: () => set({ isSelecting: false }),

  cancelSelection: () => set({ isSelecting: false, selectedCategories: [] }),
}));
