/**
 * 카테고리 인터페이스
 * @property id: 카테고리 고유 ID
 * @property name: 카테고리 표시 이름
 */
export interface ICategory {
  id: string;
  name: string;
}

/**
 * 카테고리 Store 인터페이스
 * @property selectedCategories: 선택된 카테고리 배열
 * @property isSelecting: 카테고리 선택 모드 활성화 여부
 * @property openSelection: 카테고리 선택 모드 열기
 * @property addCategory: 카테고리 추가 (최대 2개까지)
 * @property removeCategory: 카테고리 제거
 * @property isSelected: 카테고리가 이미 선택되어 있는지 확인
 * @property confirmSelection: 선택 확정 및 모드 닫기
 * @property cancelSelection: 선택 취소 및 모드 닫기
 */
export interface ICategoryStore {
  selectedCategories: ICategory[];
  isSelecting: boolean;
  openSelection: () => void;
  addCategory: (category: ICategory) => void;
  removeCategory: (categoryId: string) => void;
  isSelected: (categoryId: string) => boolean;
  confirmSelection: () => void;
  cancelSelection: () => void;
}

/**
 * 카테고리 목록
 */
export const CATEGORIES = [
  { id: 'earning', name: '용돈벌기' },
  { id: 'digital', name: '디지털' },
  { id: 'drawing', name: '그림' },
  { id: 'writing', name: '글쓰기/독서' },
  { id: 'health', name: '건강/운동' },
  { id: 'motivation', name: '동기부여/성장' },
  { id: 'hobby', name: '취미힐링' },
  { id: 'language', name: '외국어' },
] as const;

/**
 * 최대 선택 가능한 개수
 */
export const MAX_CATEGORY_COUNT = 2 as const;
