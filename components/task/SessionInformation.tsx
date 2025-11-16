'use client';

import Button from '@/components/ui/Button';
import Calendar from '@/components/task/Calendar';
import Toast from '@/components/ui/Toast';
import TimeSelector from '@/components/task/TimeSelector';
import ValidatedTextArea from '@/components/ui/ValidatedTextArea';
import { useState, useCallback } from 'react';
import { Controller } from 'react-hook-form';
import { ISessionInformation } from '@/types/task/detailedInformation';
import { useSessionTime } from '@/hooks/useSessionTime';
import { formatDate } from '@/utils/task/timeConverter';

const MIN_LENGTH = 8;
const MAX_LENGTH = 800;

export default function SessionInfo({
    sessionNumber,
    showDelete = false,
    onDelete,
    form,
    index,
    minDate,
    maxDate
}: ISessionInformation) {
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [isToastVisible, setIsToastVisible] = useState(false);

    const selectedDate = form.watch(`sessions.${index}.date`);
    const startPeriod = form.watch(`sessions.${index}.startPeriod`);
    const startHour = form.watch(`sessions.${index}.startHour`);
    const startMinute = form.watch(`sessions.${index}.startMinute`);
    const endPeriod = form.watch(`sessions.${index}.endPeriod`);
    const endHour = form.watch(`sessions.${index}.endHour`);
    const endMinute = form.watch(`sessions.${index}.endMinute`);

    // 토스트 표시
    const showToast = useCallback((message: string) => {
        setToastMessage(message);
        setIsToastVisible(true);
    }, []);

    // 시간 관련 로직을 커스텀 훅으로 분리
    const {
        handleStartPeriodToggle,
        handleStartHourChange,
        handleStartMinuteChange,
        handleEndPeriodToggle,
        handleEndHourChange,
        handleEndMinuteChange,
    } = useSessionTime({ form, index, onTimeError: showToast });

    const handleDateSelect = (date: Date) => {
        form.setValue(`sessions.${index}.date`, date);
        setIsCalendarOpen(false);
    };

    return (
        <article className='relative pt-8 pb-12 px-5 rounded-lg bg-custom-gray-100'>
            {/* 삭제 버튼 */}
            {showDelete && (
                <Button
                    type="button"
                    variant="black"
                    size="md"
                    onClick={onDelete}
                    className="absolute top-0 right-0 bg-custom-gray-100 hover:bg-custom-gray-100"
                    ariaLabel="회차 삭제 버튼"
                >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#121212" strokeWidth="2">
                        <path d="M19 5L5 19M5 5l14 14" />
                    </svg>
                </Button>
            )}

            {/* 회차 정보 */}
            <section className="mb-6">
                <h3 className="mb-4 text-2xl font-bold text-custom-black-900">
                    {sessionNumber ? `${sessionNumber}회차 정보` : '회차 정보'}
                </h3>

                {/* 날짜 선택 */}
                <div className="relative mb-4 flex items-center gap-6">
                    <label className="block text-lg text-custom-black-400 font-semibold whitespace-nowrap">날짜 선택</label>
                    <div className="relative w-full">
                        <button
                            type="button"
                            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                            className="w-full p-4 rounded-lg border border-custom-gray-200 hover:border-success-400 focus:border-success-400 bg-white font-medium text-center text-custom-black-900 focus:outline-none transition-colors cursor-pointer"
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
                <TimeSelector
                    label="시작 시간"
                    handlePeriodToggle={handleStartPeriodToggle}
                    period={startPeriod}
                    hour={startHour}
                    minute={startMinute}
                    handleHourChange={handleStartHourChange}
                    handleMinuteChange={handleStartMinuteChange}
                />

                {/* 종료 시간 */}
                <TimeSelector
                    label="종료 시간"
                    handlePeriodToggle={handleEndPeriodToggle}
                    period={endPeriod}
                    hour={endHour}
                    minute={endMinute}
                    handleHourChange={handleEndHourChange}
                    handleMinuteChange={handleEndMinuteChange}
                />
            </section>

            {/* 활동 내용 */}
            <section>
                <h3 className="mb-2 text-2xl font-bold text-custom-black-900">활동 내용</h3>
                <p className="mb-4 text-lg font-medium text-custom-gray-700">날짜별 활동 내용을 간단히 적어주세요</p>
                <Controller
                    name={`sessions.${index}.activityContent`}
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <ValidatedTextArea
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="활동 내용을 간단히 입력해주세요"
                            minLength={MIN_LENGTH}
                            maxLength={MAX_LENGTH}
                            rows={4}
                            error={fieldState.error?.message}
                            containerClassName="bg-white"
                            textareaClassName="mb-2 resize-none text-custom-black-900 placeholder:text-custom-gray-800"
                        />
                    )}
                />
            </section>

            {/* 토스트 메시지 */}
            <Toast
                message={toastMessage}
                isVisible={isToastVisible}
                onClose={() => setIsToastVisible(false)}
            />
        </article>
    );
}
