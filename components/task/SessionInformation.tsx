'use client';

import Button from '@/components/shared/Button';
import { useState } from 'react';

const MIN_LENGTH = 8;
const MAX_LENGTH = 800;

export interface ISessionInfo {
    sessionNumber?: number;
    showDelete?: boolean;
    onDelete?: () => void;
}

export default function SessionInfo({
    sessionNumber,
    showDelete = false,
    onDelete
}: ISessionInfo = {}) {
    const [date, setDate] = useState('');
    const [startPeriod, setStartPeriod] = useState<'AM' | 'PM'>('AM');
    const [startHour, setStartHour] = useState('10');
    const [startMinute, setStartMinute] = useState('00');
    const [endPeriod, setEndPeriod] = useState<'AM' | 'PM'>('AM');
    const [endHour, setEndHour] = useState('11');
    const [endMinute, setEndMinute] = useState('00');
    const [activityContent, setActivityContent] = useState('');

    const characterCount = activityContent.length;
    const isValid = characterCount >= MIN_LENGTH && characterCount <= MAX_LENGTH;

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
                <div className="mb-4 flex items-center gap-6">
                    <label className="block text-lg text-custom-black-400 font-semibold whitespace-nowrap">날짜 선택</label>
                    <input
                        type="text"
                        placeholder="날짜를 선택해주세요"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-4 py-4 rounded-lg border border-custom-gray-200 bg-white placeholder:text-custom-gray-700 placeholder:font-medium placeholder:text-center focus:outline-none focus:border-success-400"
                    />
                </div>

                {/* 시작 시간 */}
                <div className="mb-4 flex items-center gap-6">
                    <label className="block text-lg text-custom-black-400 font-semibold whitespace-nowrap">시작 시간</label>
                    <div className="w-full p-4 max-[840px]:p-2 rounded-lg border border-custom-gray-200 bg-white flex items-center justify-between">
                        <Button
                            type="button"
                            variant='outline'
                            size="md"
                            onClick={() => setStartPeriod(startPeriod === 'AM' ? 'PM' : 'AM')}
                            className="min-[840px]:px-3 min-[840px]:py-1 min-[768px]:max-[840px]:text-sm whitespace-nowrap"
                        >
                            {startPeriod === 'AM' ? '오전' : '오후'}
                        </Button>
                        <div className="w-full flex justify-center items-center gap-2 min-[768px]:max-[840px]:gap-1">
                            <input
                                type="text"
                                value={startHour}
                                onChange={(e) => setStartHour(e.target.value)}
                                className="w-16 min-[768px]:max-[840px]:w-12 px-2 min-[768px]:max-[840px]:px-1 py-2 bg-white text-center text-xl min-[768px]:max-[840px]:text-lg font-medium focus:outline-none"
                                maxLength={2}
                            />
                            <span className="text-xl min-[768px]:max-[840px]:text-lg font-medium text-">:</span>
                            <input
                                type="text"
                                value={startMinute}
                                onChange={(e) => setStartMinute(e.target.value)}
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
                            onClick={() => setEndPeriod(endPeriod === 'AM' ? 'PM' : 'AM')}
                            className="min-[840px]:px-3 min-[840px]:py-1 min-[768px]:max-[840px]:text-sm whitespace-nowrap"
                        >
                            {endPeriod === 'AM' ? '오전' : '오후'}
                        </Button>
                        <div className="w-full flex justify-center items-center gap-2 min-[768px]:max-[840px]:gap-1">
                            <input
                                type="text"
                                value={endHour}
                                onChange={(e) => setEndHour(e.target.value)}
                                className="w-16 min-[768px]:max-[840px]:w-12 px-2 min-[768px]:max-[840px]:px-1 py-2 bg-white text-center text-xl min-[768px]:max-[840px]:text-lg font-medium focus:outline-none"
                                maxLength={2}
                            />
                            <span className="text-xl min-[768px]:max-[840px]:text-lg font-medium text-">:</span>
                            <input
                                type="text"
                                value={endMinute}
                                onChange={(e) => setEndMinute(e.target.value)}
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
        </div>
    );
}
