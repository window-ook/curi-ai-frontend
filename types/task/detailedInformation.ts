import { UseFormReturn } from 'react-hook-form';
import { IDetailedInfoForm } from '@/schema/detailedInformation';

/**
 * SessionInformation 컴포넌트 Props
 * @property sessionNumber - 회차 번호 (표시용, optional)
 * @property showDelete - 삭제 버튼 표시 여부
 * @property onDelete - 삭제 버튼 클릭 핸들러
 * @property form - React Hook Form의 form 객체
 * @property index - sessions 배열에서의 인덱스
 * @property minDate - 선택 가능한 최소 날짜
 * @property maxDate - 선택 가능한 최대 날짜
 */
export interface ISessionInformation {
  sessionNumber?: number;
  showDelete?: boolean;
  onDelete?: () => void;
  form: UseFormReturn<IDetailedInfoForm>;
  index: number;
  minDate?: Date;
  maxDate?: Date;
}
