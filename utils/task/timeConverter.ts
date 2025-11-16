/**
 * 시간 변환 관련 유틸리티 함수 모음
 */

export interface ITimeInput {
  hour: number;
  minute: number;
  period: 'AM' | 'PM';
}

/**
 * 12시간 형식을 24시간 형식으로 변환
 * @param hour - 12시간 형식의 시간 (1-12)
 * @param period - AM/PM 구분
 * @returns 24시간 형식의 시간 (0-23)
 * @example
 * convertTo24Hour(12, 'AM') // 0
 * convertTo24Hour(1, 'PM') // 13
 * convertTo24Hour(12, 'PM') // 12
 */
export const convertTo24Hour = (hour: number, period: 'AM' | 'PM'): number => {
  if (period === 'AM') {
    if (hour === 12) return 0;
    return hour;
  } else {
    if (hour === 12) return 12;
    return hour + 12;
  }
};

/**
 * 24시간 형식을 12시간 형식으로 변환
 * @param hour24 - 24시간 형식의 시간 (0-23)
 * @returns 12시간 형식의 시간과 AM/PM
 * @example
 * convertTo12Hour(0) // { hour: 12, period: 'AM' }
 * convertTo12Hour(13) // { hour: 1, period: 'PM' }
 * convertTo12Hour(12) // { hour: 12, period: 'PM' }
 */
export const convertTo12Hour = (hour24: number): { hour: number; period: 'AM' | 'PM' } => {
  if (hour24 === 0) return { hour: 12, period: 'AM' };
  if (hour24 < 12) return { hour: hour24, period: 'AM' };
  if (hour24 === 12) return { hour: 12, period: 'PM' };
  return { hour: hour24 - 12, period: 'PM' };
};

/**
 * 시작 시간이 종료 시간보다 이른지 검증
 * @param startHour - 시작 시간 (12시간 형식)
 * @param startMinute - 시작 분
 * @param startPeriod - 시작 AM/PM
 * @param endHour - 종료 시간 (12시간 형식)
 * @param endMinute - 종료 분
 * @param endPeriod - 종료 AM/PM
 * @returns 시작 시간이 종료 시간보다 이르면 true
 * @example
 * isTimeValid(9, 0, 'AM', 10, 0, 'AM') // true
 * isTimeValid(10, 0, 'AM', 9, 0, 'AM') // false
 */
export const isTimeValid = (
  startHour: number,
  startMinute: number,
  startPeriod: 'AM' | 'PM',
  endHour: number,
  endMinute: number,
  endPeriod: 'AM' | 'PM'
): boolean => {
  const startHour24 = convertTo24Hour(startHour, startPeriod);
  const endHour24 = convertTo24Hour(endHour, endPeriod);

  const startMinutes = startHour24 * 60 + startMinute;
  const endMinutes = endHour24 * 60 + endMinute;

  return startMinutes < endMinutes;
};

/**
 * 시작 시간에 1시간을 더한 종료 시간 계산
 * @param startHour24 - 시작 시간 (24시간 형식)
 * @param startMinute - 시작 분
 * @returns 12시간 형식의 종료 시간
 * @example
 * calculateEndTime(13, 30) // { hour: 2, minute: 30, period: 'PM' }
 */
export const calculateEndTime = (
  startHour24: number,
  startMinute: number
): { hour: number; minute: number; period: 'AM' | 'PM' } => {
  let endHour24 = startHour24 + 1;

  // 24시를 넘어가는 경우 처리
  if (endHour24 >= 24) endHour24 = endHour24 - 24;

  const { hour, period } = convertTo12Hour(endHour24);

  return { hour, minute: startMinute, period };
};

/**
 * 날짜를 'YYYY년 MM월 DD일' 형식으로 포맷
 * @param date - 포맷할 날짜 객체
 * @returns 포맷된 날짜 문자열
 * @example
 * formatDate(new Date(2024, 0, 1)) // '2024년 01월 01일'
 */
export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}년 ${month}월 ${day}일`;
};
