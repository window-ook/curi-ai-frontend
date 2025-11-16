'use client';

import Button from '@/components/shared/Button';
import { useState } from 'react';

/**
 * 캘린더 컴포넌트 인터페이스
 * @property selectedDate - 선택된 날짜
 * @property onDateSelect - 날짜 선택 콜백
 * @property onClose - 캘린더 닫기 콜백
 * @property minDate - 최소 날짜
 * @property maxDate - 최대 날짜
 */
interface ICalendar {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  onClose: () => void;
  minDate?: Date;
  maxDate?: Date;
}

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'] as const;

export default function Calendar({ selectedDate, onDateSelect, onClose, minDate, maxDate }: ICalendar) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [currentMonth, setCurrentMonth] = useState(selectedDate ? new Date(selectedDate) : today);
  const [tempSelectedDate, setTempSelectedDate] = useState(selectedDate || today);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const goToPreviousMonth = () => setCurrentMonth(new Date(year, month - 1));
  const goToNextMonth = () => setCurrentMonth(new Date(year, month + 1));

  const getCalendarDays = () => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: Array<{ date: number; isCurrentMonth: boolean; fullDate: Date }> = [];

    // 저번 달 날짜들
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--)
      days.push({
        date: prevMonthLastDay - i,
        isCurrentMonth: false,
        fullDate: new Date(year, month - 1, prevMonthLastDay - i)
      });

    // 이번 달 날짜들
    for (let i = 1; i <= daysInMonth; i++)
      days.push({
        date: i,
        isCurrentMonth: true,
        fullDate: new Date(year, month, i)
      });

    // 다음 달 날짜들, 42칸 중 남은 칸만큼 채우기
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++)
      days.push({
        date: i,
        isCurrentMonth: false,
        fullDate: new Date(year, month + 1, i)
      });

    return days;
  };

  // 선택된 날짜와 동일한 날짜인지 확인
  const isSelectedDate = (date: Date) =>
    tempSelectedDate.getDate() === date.getDate() &&
    tempSelectedDate.getMonth() === date.getMonth() &&
    tempSelectedDate.getFullYear() === date.getFullYear();

  // 날짜 비활성화 여부 확인
  const isDateDisabled = (date: Date) => {
    const dateOnly = new Date(date);
    dateOnly.setHours(0, 0, 0, 0);

    if (minDate) {
      const min = new Date(minDate);
      min.setHours(0, 0, 0, 0);
      if (dateOnly < min) return true;
    }

    if (maxDate) {
      const max = new Date(maxDate);
      max.setHours(0, 0, 0, 0);
      if (dateOnly > max) return true;
    }

    return false;
  };

  const handleConfirm = () => {
    onDateSelect(tempSelectedDate);
    onClose();
  };

  const calendarDays = getCalendarDays();

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="날짜 선택 캘린더"
      className="absolute top-full left-0 mt-2 z-50 w-full min-w-[320px] max-w-[600px] max-[484px]:-left-1/3 max-[484px]:translate-x-0.5 p-8 rounded-2xl shadow-2xl border border-custom-gray-200 bg-white"
    >
      {/* 연도/월, 이동 버튼 */}
      <header className="mb-6 flex items-center justify-between">
        <h2 className="text-base font-bold text-custom-black-400">
          {year}년 {month + 1}월
        </h2>
        <nav
          aria-label="캘린더 월 이동 버튼"
          className="flex gap-2"
        >
          <button
            type="button"
            onClick={goToPreviousMonth}
            className="size-8 rounded-lg border border-custom-gray-200 hover:bg-custom-gray-100 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="이전 달 이동 버튼"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="#121212" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={goToNextMonth}
            className="size-8 rounded-lg border border-custom-gray-200 hover:bg-custom-gray-100 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="다음 달 이동 버튼"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="#121212" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </nav>
      </header>

      {/* 요일 행 */}
      <div className="mb-4 grid grid-cols-7 gap-2">
        {WEEKDAYS.map((day) => (
          <div key={day} className="text-base text-center font-bold text-custom-black-400">
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="mb-6 grid grid-cols-7 gap-2">
        {calendarDays.map((day, index) => {
          const isSelected = isSelectedDate(day.fullDate);
          const isOutRange = !day.isCurrentMonth;
          const isDisabled = isDateDisabled(day.fullDate);

          return (
            <button
              key={index}
              onClick={() => !isDisabled && setTempSelectedDate(day.fullDate)}
              disabled={isDisabled}
              className={`aspect-square rounded-lg text-lg font-medium transition-colors
                ${isSelected
                  ? 'bg-success-400 text-white'
                  : isDisabled
                    ? 'text-custom-gray-200 cursor-not-allowed'
                    : isOutRange
                      ? 'text-custom-gray-700 hover:bg-custom-gray-100 cursor-pointer'
                      : 'text-custom-black-400 hover:bg-custom-gray-100 cursor-pointer'
                }
              `}
            >
              {day.date}
            </button>
          );
        })}
      </div>

      <Button
        type="button"
        variant="success"
        size="md"
        onClick={handleConfirm}
        className="w-full text-lg font-semibold"
        ariaLabel="날짜 선택 완료 버튼"
      >
        선택 완료
      </Button>
    </div>
  );
}
