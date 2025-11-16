/**
 * 공통 유효성 검사 텍스트 영역
 * @property value - 텍스트 영역의 값
 * @property onChange - 텍스트 영역의 값 변경 시 호출되는 함수
 * @property placeholder - 텍스트 영역의 플레이스홀더
 * @property minLength - 최소 길이
 * @property maxLength - 최대 길이
 * @property rows - 텍스트 영역의 행 수
 * @property error - React Hook Form의 에러 메시지 (우선 표시)
 * @property containerClassName - 컨테이너 클래스 이름
 * @property textareaClassName - 텍스트 영역 클래스 이름
 */
export interface IValidatedTextarea {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  minLength: number;
  maxLength: number;
  rows?: number;
  error?: string;
  containerClassName?: string;
  textareaClassName?: string;
}
