import { z } from 'zod';

const MIN_ACTIVITY_LENGTH = 8;
const MAX_ACTIVITY_LENGTH = 800;

/**
 * 회차 정보 스키마: 단일 회차의 데이터 구조
 * @description
 * - 날짜, 시작/종료 시간, 활동 내용을 포함
 * - 시간은 12시간제로 입력되며, 시작 시간이 종료 시간보다 빠른지 검증
 */
export const sessionInformationSchema = z.object({
  date: z.date().nullable().refine(val => val !== null, {
    message: '날짜를 선택해주세요'
  }),
  startPeriod: z.enum(['AM', 'PM']),
  startHour: z.string()
    .refine(val => {
      if (!val) return false;
      const num = parseInt(val);
      return num >= 1 && num <= 12;
    }, '1~12 사이의 값을 입력해주세요'),
  startMinute: z.string()
    .refine(val => {
      if (!val) return false;
      const num = parseInt(val);
      return num >= 0 && num <= 59;
    }, '0~59 사이의 값을 입력해주세요'),
  endPeriod: z.enum(['AM', 'PM']),
  endHour: z.string()
    .refine(val => {
      if (!val) return false;
      const num = parseInt(val);
      return num >= 1 && num <= 12;
    }, '1~12 사이의 값을 입력해주세요'),
  endMinute: z.string()
    .refine(val => {
      if (!val) return false;
      const num = parseInt(val);
      return num >= 0 && num <= 59;
    }, '0~59 사이의 값을 입력해주세요'),
  activityContent: z.string()
    .min(MIN_ACTIVITY_LENGTH, `${MIN_ACTIVITY_LENGTH}자 이상 입력해주세요`)
    .max(MAX_ACTIVITY_LENGTH, `${MAX_ACTIVITY_LENGTH}자 이하로 입력해주세요`)
}).refine(data => {
  const convertTo24Hour = (hour: number, period: 'AM' | 'PM'): number => {
    if (period === 'AM') {
      if (hour === 12) return 0;
      return hour;
    } else {
      if (hour === 12) return 12;
      return hour + 12;
    }
  };

  const startHour24 = convertTo24Hour(parseInt(data.startHour), data.startPeriod);
  const endHour24 = convertTo24Hour(parseInt(data.endHour), data.endPeriod);

  const startMinutes = startHour24 * 60 + parseInt(data.startMinute);
  const endMinutes = endHour24 * 60 + parseInt(data.endMinute);

  return startMinutes < endMinutes;
}, {
  message: '종료시간은 시작 시간보다 빠를 수 없습니다.',
  path: ['endHour']
});

/**
 * 상세 정보 전체 스키마: 여러 회차를 포함하는 배열
 * @description
 * - 최소 1개의 회차 필요
 * - 회차 간 날짜가 순서대로 입력되었는지 검증
 */
export const detailedInformationSchema = z.object({
  sessions: z.array(sessionInformationSchema).min(1, '최소 1개의 회차가 필요합니다')
}).refine(data => {
  const dates = data.sessions
    .map(s => s.date)
    .filter((d): d is Date => d !== null);

  if (dates.length <= 1) return true;

  for (let i = 0; i < dates.length - 1; i++) {
    if (dates[i] >= dates[i + 1]) return false;
  }
  return true;
}, {
  message: '회차 날짜는 순서대로 입력해주세요',
  path: ['sessions']
});

export type ISessionForm = z.infer<typeof sessionInformationSchema>;
export type IDetailedInfoForm = z.infer<typeof detailedInformationSchema>;
