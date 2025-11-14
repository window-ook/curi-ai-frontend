import { useRef, useState, type ChangeEvent } from 'react';
import { validateImage } from '@/utils/task/imageValidation';
import type { IImageFile } from '@/types/task/image';

/**
 * 여러 장의 이미지 업로드 기능을 제공하는 커스텀 훅
 * - 최대 4장까지 이미지 업로드 가능
 * - 파일 선택 및 미리보기 생성
 * - 파일 유효성 검증: 크기, 형식
 * - 메모리 관리 (Object URL 해제)
 * @param maxImages - 최대 업로드 가능한 이미지 수 (기본값: 4)
 * @returns 이미지 배열 및 핸들러 함수들
 */
export const useMultipleImageUpload = (maxImages: number = 4) => {
  const [images, setImages] = useState<IImageFile[]>([]);
  const [replacingIndex, setReplacingIndex] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSelectImage = () => {
    if (images.length >= maxImages) {
      alert(`최대 ${maxImages}장까지 업로드할 수 있습니다.`);
      return;
    }
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);

    if (replacingIndex !== null) {
      const file = fileArray[0];
      if (!file) return;

      const isValid = validateImage(file);
      if (!isValid) {
        setReplacingIndex(null);
        return;
      }

      const targetImage = images[replacingIndex];
      if (targetImage?.preview) URL.revokeObjectURL(targetImage.preview);

      const preview = URL.createObjectURL(file);
      setImages((prev) => {
        const newImages = [...prev];
        newImages[replacingIndex] = { file, preview };
        return newImages;
      });

      setReplacingIndex(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    const totalCount = images.length + fileArray.length;
    if (totalCount > maxImages) {
      alert(`최대 ${maxImages}장까지 업로드할 수 있습니다. (현재: ${images.length}장)`);
      return;
    }

    const newImages: IImageFile[] = [];
    const invalidFiles: string[] = [];

    fileArray.forEach((file) => {
      const isValid = validateImage(file);
      if (isValid) {
        const preview = URL.createObjectURL(file);
        newImages.push({ file, preview });
      } else {
        invalidFiles.push(file.name);
      }
    });

    if (invalidFiles.length > 0) return;

    // 유효한 파일들을 상태에 추가
    if (newImages.length > 0) setImages((prev) => [...prev, ...newImages]);

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // 특정 인덱스의 이미지를 제거
  const handleRemoveImage = (index: number) => {
    setImages((prev) => {
      const targetImage = prev[index];
      if (targetImage?.preview) URL.revokeObjectURL(targetImage.preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  // 특정 인덱스의 이미지를 교체
  const handleReplaceImage = (index: number) => {
    setReplacingIndex(index);
    fileInputRef.current?.click();
  };

  return {
    images,
    fileInputRef,
    maxImages,
    canAddMore: images.length < maxImages,
    handleSelectImage,
    handleFileChange,
    handleRemoveImage,
    handleReplaceImage,
  };
};
