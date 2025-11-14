import { useRef, useState, type ChangeEvent } from 'react';
import { validateImage } from '@/utils/task/imageValidation';
import type { IImageFile } from '@/types/task/image';

/**
 * 이미지 업로드 기능을 제공하는 커스텀 훅
 * - 파일 선택 및 미리보기 생성
 * - 파일 유효성 검증 (크기, 형식)
 * - 메모리 관리 (Object URL 해제)
 * @returns 이미지 상태 및 핸들러 함수들
 */
export const useImageUpload = () => {
  const [image, setImage] = useState<IImageFile | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSelectImage = () => fileInputRef.current?.click();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 파일 크기 및 형식 검증
    const isValid = validateImage(file);
    if (!isValid) return;

    const preview = URL.createObjectURL(file);

    setImage({ file, preview });

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemoveImage = () => {
    if (image?.preview) URL.revokeObjectURL(image.preview);
    setImage(null);
  };

  return {
    image,
    fileInputRef,
    handleSelectImage,
    handleFileChange,
    handleRemoveImage,
  };
};
