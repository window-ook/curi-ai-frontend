'use client';

import Button from '@/components/shared/Button';
import { useState } from 'react';

export interface ICalendar {
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

    // 다음 달 날짜들 (42칸 채우기)
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++)
      days.push({
        date: i,
        isCurrentMonth: false,
        fullDate: new Date(year, month + 1, i)
      });

    return days;
  };

  const isSelectedDate = (date: Date) =>
    tempSelectedDate.getDate() === date.getDate() &&
    tempSelectedDate.getMonth() === date.getMonth() &&
    tempSelectedDate.getFullYear() === date.getFullYear();

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
    <div className="absolute top-full left-0 mt-2 z-50 w-full min-w-[320px] max-w-[600px] p-8 rounded-2xl bg-white shadow-2xl border border-custom-gray-200">
      {/* 연도/월, 이동 버튼 */}
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-base font-bold text-custom-black-400">
          {year}년 {month + 1}월
        </h3>
        <div className="flex gap-2">
          <button
            onClick={goToPreviousMonth}
            className="size-8 rounded-lg border border-custom-gray-200 flex items-center justify-center hover:bg-custom-gray-100 transition-colors cursor-pointer"
            aria-label="이전 달"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="#121212" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={goToNextMonth}
            className="size-8 rounded-lg border border-custom-gray-200 flex items-center justify-center hover:bg-custom-gray-100 transition-colors cursor-pointer"
            aria-label="다음 달"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="#121212" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* 요일 행 */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {WEEKDAYS.map((day) => (
          <div key={day} className="text-base text-center font-bold text-custom-black-400">
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7 gap-2 mb-6">
        {calendarDays.map((day, index) => {
          const isSelected = isSelectedDate(day.fullDate);
          const isOutRange = !day.isCurrentMonth;
          const isDisabled = isDateDisabled(day.fullDate);

          return (
            <button
              key={index}
              onClick={() => !isDisabled && setTempSelectedDate(day.fullDate)}
              disabled={isDisabled}
              className={`
                aspect-square rounded-lg text-lg font-medium transition-colors
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
      >
        선택 완료
      </Button>
    </div>
  );
}
