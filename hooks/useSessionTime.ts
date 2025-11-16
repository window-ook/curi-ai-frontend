import { useCallback } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { convertTo24Hour, isTimeValid, calculateEndTime } from '@/utils/task/timeConverter';

export interface ISessionFormData {
  sessions: Array<{
    date: Date | null;
    startPeriod: 'AM' | 'PM';
    startHour: string;
    startMinute: string;
    endPeriod: 'AM' | 'PM';
    endHour: string;
    endMinute: string;
    activityContent: string;
  }>;
}

export interface IUseSessionTime {
  form: UseFormReturn<ISessionFormData>;
  index: number;
  onTimeError: (message: string) => void;
}

/**
 * 회차 정보의 시간 선택 로직을 관리하는 커스텀 훅
 * @param form - React Hook Form 인스턴스
 * @param index - 현재 회차의 인덱스
 * @param onTimeError - 시간 유효성 검증 실패 시 호출되는 콜백
 * @returns 시간 관련 핸들러 함수들
 */
export const useSessionTime = ({ form, index, onTimeError }: IUseSessionTime) => {
  const startPeriod = form.watch(`sessions.${index}.startPeriod`);
  const startHour = form.watch(`sessions.${index}.startHour`);
  const startMinute = form.watch(`sessions.${index}.startMinute`);
  const endPeriod = form.watch(`sessions.${index}.endPeriod`);
  const endHour = form.watch(`sessions.${index}.endHour`);
  const endMinute = form.watch(`sessions.${index}.endMinute`);

  // 종료 시간을 시작 시간 +1시간으로 자동 설정
  const updateEndTime = useCallback(
    (newStartHour24: number, newStartMinute: number) => {
      const { hour, minute, period } = calculateEndTime(newStartHour24, newStartMinute);

      form.setValue(`sessions.${index}.endPeriod`, period);
      form.setValue(`sessions.${index}.endHour`, String(hour).padStart(2, '0'));
      form.setValue(`sessions.${index}.endMinute`, String(minute).padStart(2, '0'));
    },
    [form, index]
  );

  // 시작 오전/오후 토글
  const handleStartPeriodToggle = useCallback(() => {
    const newPeriod = startPeriod === 'AM' ? 'PM' : 'AM';
    form.setValue(`sessions.${index}.startPeriod`, newPeriod);
    form.setValue(`sessions.${index}.endPeriod`, newPeriod);
  }, [form, index, startPeriod]);

  // 시작 시간 변경
  const handleStartHourChange = useCallback(
    (value: string) => {
      if (value && !/^\d+$/.test(value)) return;

      const numValue = parseInt(value);
      if (value && (numValue < 1 || numValue > 12)) return;

      form.setValue(`sessions.${index}.startHour`, value);

      // 시작 시간 변경 시 종료 시간 자동 업데이트
      if (value) {
        const startHour24 = convertTo24Hour(numValue, startPeriod);
        const startMin = parseInt(startMinute) || 0;
        updateEndTime(startHour24, startMin);
      }
    },
    [form, index, startPeriod, startMinute, updateEndTime]
  );

  // 시작 분 변경
  const handleStartMinuteChange = useCallback(
    (value: string) => {
      if (value && !/^\d+$/.test(value)) return;

      const numValue = parseInt(value);
      if (value && (numValue < 0 || numValue > 59)) return;

      form.setValue(`sessions.${index}.startMinute`, value);

      // 시작 분 변경 시 종료 시간 자동 업데이트
      if (value && startHour) {
        const startHour24 = convertTo24Hour(parseInt(startHour), startPeriod);
        updateEndTime(startHour24, numValue);
      }
    },
    [form, index, startHour, startPeriod, updateEndTime]
  );

  // 종료 시간 변경
  const handleEndHourChange = useCallback(
    (value: string) => {
      if (value && !/^\d+$/.test(value)) return;

      const numValue = parseInt(value);
      if (value && (numValue < 1 || numValue > 12)) return;

      form.setValue(`sessions.${index}.endHour`, value);

      // 종료 시간 입력 완료 후 유효성 검증
      if (value && startHour && startMinute && endMinute) {
        const startHourNum = parseInt(startHour);
        const startMinuteNum = parseInt(startMinute);
        const endMinuteNum = parseInt(endMinute);

        if (!isTimeValid(startHourNum, startMinuteNum, startPeriod, numValue, endMinuteNum, endPeriod))
          onTimeError('종료시간은 시작 시간보다 빠를 수 없습니다.');
      }
    },
    [form, index, startHour, startMinute, startPeriod, endMinute, endPeriod, onTimeError]
  );

  // 종료 분 변경
  const handleEndMinuteChange = useCallback(
    (value: string) => {
      if (value && !/^\d+$/.test(value)) return;

      const numValue = parseInt(value);
      if (value && (numValue < 0 || numValue > 59)) return;

      form.setValue(`sessions.${index}.endMinute`, value);

      // 종료 분 입력 완료 후 유효성 검증
      if (value && startHour && startMinute && endHour) {
        const startHourNum = parseInt(startHour);
        const startMinuteNum = parseInt(startMinute);
        const endHourNum = parseInt(endHour);

        if (!isTimeValid(startHourNum, startMinuteNum, startPeriod, endHourNum, numValue, endPeriod))
          onTimeError('종료시간은 시작 시간보다 빠를 수 없습니다.');
      }
    },
    [form, index, startHour, startMinute, startPeriod, endHour, endPeriod, onTimeError]
  );

  // 종료 오전/오후 토글
  const handleEndPeriodToggle = useCallback(() => {
    const newPeriod = endPeriod === 'AM' ? 'PM' : 'AM';
    form.setValue(`sessions.${index}.endPeriod`, newPeriod);

    // 토글 후 유효성 검증
    if (startHour && startMinute && endHour && endMinute) {
      const startHourNum = parseInt(startHour);
      const startMinuteNum = parseInt(startMinute);
      const endHourNum = parseInt(endHour);
      const endMinuteNum = parseInt(endMinute);

      if (!isTimeValid(startHourNum, startMinuteNum, startPeriod, endHourNum, endMinuteNum, newPeriod))
        onTimeError('종료시간은 시작 시간보다 빠를 수 없습니다.');
    }
  }, [form, index, endPeriod, startHour, startMinute, startPeriod, endHour, endMinute, onTimeError]);

  return {
    handleStartPeriodToggle,
    handleStartHourChange,
    handleStartMinuteChange,
    handleEndPeriodToggle,
    handleEndHourChange,
    handleEndMinuteChange,
  };
};
