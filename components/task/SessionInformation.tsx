'use client';

import Button from '@/components/shared/Button';
import Calendar from '@/components/task/Calendar';
import Toast from '@/components/shared/Toast';
import { useState, useEffect, useCallback } from 'react';

const MIN_LENGTH = 8;
const MAX_LENGTH = 800;

export interface ISessionInfo {
    sessionNumber?: number;
    showDelete?: boolean;
    onDelete?: () => void;
    selectedDate: Date | null;
    onDateChange: (date: Date | null) => void;
    minDate?: Date;
    maxDate?: Date;
}

export default function SessionInfo({
    sessionNumber,
    showDelete = false,
    onDelete,
    selectedDate,
    onDateChange,
    minDate,
    maxDate
}: ISessionInfo) {
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [startPeriod, setStartPeriod] = useState<'AM' | 'PM'>('AM');
    const [startHour, setStartHour] = useState('10');
    const [startMinute, setStartMinute] = useState('00');
    const [endPeriod, setEndPeriod] = useState<'AM' | 'PM'>('AM');
    const [endHour, setEndHour] = useState('11');
    const [endMinute, setEndMinute] = useState('00');
    const [activityContent, setActivityContent] = useState('');
    const [toastMessage, setToastMessage] = useState('');
    const [isToastVisible, setIsToastVisible] = useState(false);

    const characterCount = activityContent.length;
    const isValid = characterCount >= MIN_LENGTH && characterCount <= MAX_LENGTH;

    // 12시간제를 24시간제로 변환
    const convertTo24Hour = useCallback((hour: number, period: 'AM' | 'PM'): number => {
        if (period === 'AM') {
            if (hour === 12) return 0;
            return hour;
        } else {
            if (hour === 12) return 12;
            return hour + 12;
        }
    }, []);

    // 24시간제를 12시간제로 변환
    const convertTo12Hour = useCallback((hour24: number): { hour: number; period: 'AM' | 'PM' } => {
        if (hour24 === 0) return { hour: 12, period: 'AM' };
        if (hour24 < 12) return { hour: hour24, period: 'AM' };
        if (hour24 === 12) return { hour: 12, period: 'PM' };
        return { hour: hour24 - 12, period: 'PM' };
    }, []);

    // 시간 비교 (시작 <= 종료 검증)
    const isTimeValid = useCallback((): boolean => {
        const startHour24 = convertTo24Hour(parseInt(startHour) || 0, startPeriod);
        const endHour24 = convertTo24Hour(parseInt(endHour) || 0, endPeriod);

        const startMinutes = startHour24 * 60 + (parseInt(startMinute) || 0);
        const endMinutes = endHour24 * 60 + (parseInt(endMinute) || 0);

        return startMinutes < endMinutes;
    }, [startHour, startPeriod, endHour, endPeriod, startMinute, endMinute, convertTo24Hour]);

    // 토스트 표시
    const showToast = useCallback((message: string) => {
        setToastMessage(message);
        setIsToastVisible(true);
    }, []);

    // 종료 시간을 시작 시간 +1시간으로 자동 설정
    const updateEndTime = useCallback((newStartHour24: number, newStartMinute: number) => {
        let newEndHour24 = newStartHour24 + 1;
        const newEndMinute = newStartMinute;

        // 24시를 넘어가는 경우 처리
        if (newEndHour24 >= 24) newEndHour24 = newEndHour24 - 24;

        const { hour, period } = convertTo12Hour(newEndHour24);
        setEndPeriod(period);
        setEndHour(String(hour).padStart(2, '0'));
        setEndMinute(String(newEndMinute).padStart(2, '0'));
    }, [convertTo12Hour]);

    // 시작 오전/오후 토글 핸들러
    const handleStartPeriodToggle = () => {
        const newPeriod = startPeriod === 'AM' ? 'PM' : 'AM';
        setStartPeriod(newPeriod);
        setEndPeriod(newPeriod);
    };

    // 시작 시간 변경 핸들러
    const handleStartHourChange = (value: string) => {
        // 숫자만 입력 가능
        if (value && !/^\d+$/.test(value)) return;

        // 1~12 범위만 허용
        const numValue = parseInt(value);
        if (value && (numValue < 1 || numValue > 12)) return;

        setStartHour(value);

        // 시작 시간 변경 시 종료 시간 자동 업데이트 (+1시간)
        if (value) {
            const startHour24 = convertTo24Hour(numValue, startPeriod);
            const startMin = parseInt(startMinute) || 0;
            updateEndTime(startHour24, startMin);
        }
    };

    // 시작 분 변경 핸들러
    const handleStartMinuteChange = (value: string) => {
        // 숫자만 입력 가능
        if (value && !/^\d+$/.test(value)) return;

        // 0~59 범위만 허용
        const numValue = parseInt(value);
        if (value && (numValue < 0 || numValue > 59)) return;

        setStartMinute(value);

        // 시작 분 변경 시 종료 시간 자동 업데이트 (+1시간)
        if (value && startHour) {
            const startHour24 = convertTo24Hour(parseInt(startHour), startPeriod);
            updateEndTime(startHour24, numValue);
        }
    };

    // 종료 시간 변경 핸들러
    const handleEndHourChange = (value: string) => {
        // 숫자만 입력 가능
        if (value && !/^\d+$/.test(value)) return;

        // 1~12 범위만 허용
        const numValue = parseInt(value);
        if (value && (numValue < 1 || numValue > 12)) return;

        setEndHour(value);
    };

    // 종료 분 변경 핸들러
    const handleEndMinuteChange = (value: string) => {
        // 숫자만 입력 가능
        if (value && !/^\d+$/.test(value)) return;

        // 0~59 범위만 허용
        const numValue = parseInt(value);
        if (value && (numValue < 0 || numValue > 59)) return;

        setEndMinute(value);
    };

    // 종료 오전/오후 토글 핸들러
    const handleEndPeriodToggle = () => {
        const newPeriod = endPeriod === 'AM' ? 'PM' : 'AM';
        setEndPeriod(newPeriod);
    };

    // 종료 시간 유효성 검증 (useEffect)
    useEffect(() => {
        // 모든 시간 입력이 완료되지 않았으면 검증하지 않음
        if (!startHour || !startMinute || !endHour || !endMinute) return;

        // 시간 유효성 검증
        if (!isTimeValid()) {
            // setTimeout을 사용하여 다음 렌더 사이클에서 상태 업데이트
            setTimeout(() => {
                showToast('종료시간은 시작 시간보다 빠를 수 없습니다.');

                // 종료 시간을 시작 시간 +1시간으로 자동 수정
                const startHour24 = convertTo24Hour(parseInt(startHour), startPeriod);
                const startMin = parseInt(startMinute);
                updateEndTime(startHour24, startMin);
            }, 0);
        }
    }, [endHour, endMinute, endPeriod, startHour, startMinute, startPeriod, isTimeValid, showToast, convertTo24Hour, updateEndTime]);

    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}년 ${month}월 ${day}일`;
    };

    const handleDateSelect = (date: Date) => {
        onDateChange(date);
        setIsCalendarOpen(false);
    };

    return (
        <div className='py-7 px-5 rounded-lg bg-custom-gray-100 relative'>
            {/* 삭제 버튼 */}
            {showDelete && (
                <Button
                    type="button"
                    variant="black"
                    size="md"
                    onClick={onDelete}
                    className="absolute top-0 right-0 bg-custom-gray-100 hover:bg-custom-gray-100"
                >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#121212" strokeWidth="2">
                        <path d="M19 5L5 19M5 5l14 14" />
                    </svg>
                </Button>
            )}
            {/* 회차 정보 */}
            <div className="mb-6">
                <h3 className="mb-4 text-2xl font-bold">
                    {sessionNumber ? `${sessionNumber}회차 정보` : '회차 정보'}
                </h3>

                {/* 날짜 선택 */}
                <div className="mb-4 flex items-center gap-6 relative">
                    <label className="block text-lg text-custom-black-400 font-semibold whitespace-nowrap">날짜 선택</label>
                    <div className="w-full relative">
                        <button
                            type="button"
                            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                            className="w-full px-4 py-4 rounded-lg border border-custom-gray-200 bg-white font-medium text-center hover:border-success-400 focus:outline-none focus:border-success-400 transition-colors"
                        >
                            {selectedDate ? formatDate(selectedDate) : <span className='text-custom-gray-700'>날짜를 선택해주세요</span>}
                        </button>
                        {isCalendarOpen && (
                            <Calendar
                                selectedDate={selectedDate}
                                onDateSelect={handleDateSelect}
                                onClose={() => setIsCalendarOpen(false)}
                                minDate={minDate}
                                maxDate={maxDate}
                            />
                        )}
                    </div>
                </div>

                {/* 시작 시간 */}
                <div className="mb-4 flex items-center gap-6">
                    <label className="block text-lg text-custom-black-400 font-semibold whitespace-nowrap">시작 시간</label>
                    <div className="w-full p-4 max-[840px]:p-2 rounded-lg border border-custom-gray-200 bg-white flex items-center justify-between">
                        <Button
                            type="button"
                            variant='outline'
                            size="md"
                            onClick={handleStartPeriodToggle}
                            className="min-[840px]:px-3 min-[840px]:py-1 min-[768px]:max-[840px]:text-sm whitespace-nowrap"
                        >
                            {startPeriod === 'AM' ? '오전' : '오후'}
                        </Button>
                        <div className="w-full flex justify-center items-center gap-2 min-[768px]:max-[840px]:gap-1">
                            <input
                                type="text"
                                value={startHour}
                                onChange={(e) => handleStartHourChange(e.target.value)}
                                className="w-16 min-[768px]:max-[840px]:w-12 px-2 min-[768px]:max-[840px]:px-1 py-2 bg-white text-center text-xl min-[768px]:max-[840px]:text-lg font-medium focus:outline-none"
                                maxLength={2}
                            />
                            <span className="text-xl min-[768px]:max-[840px]:text-lg font-medium text-">:</span>
                            <input
                                type="text"
                                value={startMinute}
                                onChange={(e) => handleStartMinuteChange(e.target.value)}
                                className="w-16 min-[768px]:max-[840px]:w-12 px-2 min-[768px]:max-[840px]:px-1 py-2 bg-white text-center text-xl min-[768px]:max-[840px]:text-lg font-medium focus:outline-none"
                                maxLength={2}
                            />
                        </div>
                    </div>
                </div>

                {/* 종료 시간 */}
                <div className="mb-4 flex items-center gap-6">
                    <label className="block text-lg text-custom-black-400 font-semibold whitespace-nowrap">종료 시간</label>
                    <div className="w-full p-4 max-[840px]:p-2 rounded-lg border border-custom-gray-200 bg-white flex items-center justify-between">
                        <Button
                            type="button"
                            variant='outline'
                            size="md"
                            onClick={handleEndPeriodToggle}
                            className="min-[840px]:px-3 min-[840px]:py-1 min-[768px]:max-[840px]:text-sm whitespace-nowrap"
                        >
                            {endPeriod === 'AM' ? '오전' : '오후'}
                        </Button>
                        <div className="w-full flex justify-center items-center gap-2 min-[768px]:max-[840px]:gap-1">
                            <input
                                type="text"
                                value={endHour}
                                onChange={(e) => handleEndHourChange(e.target.value)}
                                className="w-16 min-[768px]:max-[840px]:w-12 px-2 min-[768px]:max-[840px]:px-1 py-2 bg-white text-center text-xl min-[768px]:max-[840px]:text-lg font-medium focus:outline-none"
                                maxLength={2}
                            />
                            <span className="text-xl min-[768px]:max-[840px]:text-lg font-medium text-">:</span>
                            <input
                                type="text"
                                value={endMinute}
                                onChange={(e) => handleEndMinuteChange(e.target.value)}
                                className="w-16 min-[768px]:max-[840px]:w-12 px-2 min-[768px]:max-[840px]:px-1 py-2 bg-white text-center text-xl min-[768px]:max-[840px]:text-lg font-medium focus:outline-none"
                                maxLength={2}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* 활동 내용 */}
            <div>
                <h3 className="mb-2 text-2xl font-bold ">활동 내용</h3>
                <p className="mb-4 text-lg text-custom-gray-700 font-medium">날짜별 활동 내용을 간단히 적어주세요</p>
                <div className={`p-4 rounded-lg border bg-white flex flex-col 
                    ${isValid ? 'border-success-400' : characterCount > 0 ? 'border-error' : 'border-custom-gray-200'}`}>
                    <textarea
                        placeholder="활동 내용을 간단히 입력해주세요"
                        value={activityContent}
                        maxLength={MAX_LENGTH}
                        rows={4}
                        onChange={(e) => setActivityContent(e.target.value)}
                        className="w-full placeholder:text-custom-gray-800 focus:outline-none resize-none mb-2"
                    />
                    <p className={`text-sm font-medium text-right ${isValid ? 'text-custom-gray-700' : characterCount > 0 ? 'text-text-error' : 'text-custom-gray-700'}`}>
                        {characterCount} / {MAX_LENGTH}자 (최소 {MIN_LENGTH}자)
                    </p>
                </div>
            </div>

            {/* 토스트 메시지 */}
            <Toast
                message={toastMessage}
                isVisible={isToastVisible}
                onClose={() => setIsToastVisible(false)}
            />
        </div>
    );
}
