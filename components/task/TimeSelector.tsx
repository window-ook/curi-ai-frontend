'use client';

import Button from '@/components/shared/Button';

interface ITimeSelector {
    label: string;
    handlePeriodToggle: () => void;
    period: 'AM' | 'PM';
    hour: string;
    minute: string;
    handleHourChange: (value: string) => void;
    handleMinuteChange: (value: string) => void;
}

const INPUT_STYLE = "w-16 min-[768px]:max-[840px]:w-12 px-2 min-[768px]:max-[840px]:px-1 py-2 bg-white text-center text-xl min-[768px]:max-[840px]:text-lg font-medium text-custom-black-900 focus:outline-none";

export default function TimeSelector({ label, handlePeriodToggle, period, hour, minute, handleHourChange, handleMinuteChange }: ITimeSelector) {
    return (
        <section className="mb-4 flex items-center gap-6">
            <label className="block text-lg text-custom-black-400 font-semibold whitespace-nowrap">{label}</label>
            <div className="w-full p-4 max-[840px]:p-2 rounded-lg border border-custom-gray-200 bg-white flex items-center justify-between">
                {/* 오전/오후 선택 버튼 */}
                <Button
                    type="button"
                    variant='outline'
                    size="md"
                    onClick={handlePeriodToggle}
                    className="min-[840px]:px-3 min-[840px]:py-1 min-[768px]:max-[840px]:text-sm whitespace-nowrap"
                    ariaLabel="오전/오후 선택 버튼"
                >
                    {period === 'AM' ? '오전' : '오후'}
                </Button>
                {/* 시간 입력 필드 */}
                <div className="w-full flex justify-center items-center gap-2 min-[768px]:max-[840px]:gap-1">
                    <input
                        type="text"
                        value={hour}
                        onChange={(e) => handleHourChange(e.target.value)}
                        className={INPUT_STYLE}
                        maxLength={2}
                    />
                    <span className="text-xl min-[768px]:max-[840px]:text-lg font-medium text-custom-black-900">:</span>
                    <input
                        type="text"
                        value={minute}
                        onChange={(e) => handleMinuteChange(e.target.value)}
                        className={INPUT_STYLE}
                        maxLength={2}
                    />
                </div>
            </div>
        </section>
    );
}
