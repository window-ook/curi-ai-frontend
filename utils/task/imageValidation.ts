import type { IImageValidation } from '@/types/task/image';

/**
 * 대표 이미지 유효성 검증 기준
 */
export const IMAGE_VALIDATION_CONFIG: IImageValidation = {
  maxSize: 15 * 1024 * 1024, // 15MB
  allowedFormats: ['image/jpeg', 'image/png'],
} as const;

/**
 * 파일 크기가 제한 범위 내에 있는지 검증
 * @param file - 검증할 파일 객체
 * @param maxSize - 최대 허용 크기 (바이트)
 * @returns 검증 통과 여부
 */
export const validateFileSize = (file: File, maxSize: number): boolean => {
  return file.size <= maxSize;
};

/**
 * 파일 형식이 허용된 형식인지 검증
 * @param file - 검증할 파일 객체
 * @param allowedTypes - 허용된 MIME 타입 배열
 * @returns 검증 통과 여부
 */
export const validateFileType = (
  file: File,
  allowedTypes: string[]
): boolean => {
  return allowedTypes.includes(file.type);
};

/**
 * 이미지 파일의 유효성을 검증
 * 파일 크기와 형식만 확인합니다
 * @param file - 검증할 이미지 파일
 * @returns 검증 통과 여부
 */
export const validateImage = (file: File): boolean => {
  if (!validateFileSize(file, IMAGE_VALIDATION_CONFIG.maxSize)) return false;
  if (!validateFileType(file, IMAGE_VALIDATION_CONFIG.allowedFormats)) return false;

  return true;
};
