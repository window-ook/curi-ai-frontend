/**
 * 업로드된 이미지 파일 정보를 나타내는 인터페이스
 * @property file - 업로드된 파일 객체
 * @property preview - 미리보기를 위한 Object URL
 */
export interface IImageFile {
  file: File;
  preview: string;
}

/**
 * 이미지 파일 유효성 검증 기준을 정의하는 인터페이스
 * @property maxSize - 최대 파일 크기, 15MB = 15 * 1024 * 1024
 * @property allowedFormats - 허용된 MIME 타입 배열 ['image/jpeg', 'image/png']
 */
export interface IImageValidation {
  maxSize: number;
  allowedFormats: string[];
}
