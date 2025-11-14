'use client';

import { useState } from 'react';

export const ActivityMethod = () => {
  const [selectedMethod, setSelectedMethod] = useState<'online' | 'offline'>('online');

  return (
    <div className="w-full flex flex-col gap-4">
      <h2 className="text-subtitle font-bold">활동 방식 선택</h2>
      <p className="text-xl text-custom-gray-700 font-medium">만남을 어떤 방식으로 진행하시겠어요?</p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => setSelectedMethod('online')}
          className={`flex-1 px-5 py-4 rounded-lg text-xl font-semibold transition-colors cursor-pointer ${selectedMethod === 'online'
            ? 'bg-success-100 border border-success-400 text-success-700'
            : 'bg-white border border-custom-gray-200 hover:bg-custom-gray-100'}`}>
          온라인
        </button>
        <button
          type="button"
          onClick={() => setSelectedMethod('offline')}
          className={`flex-1 px-5 py-4 rounded-lg text-xl font-semibold transition-colors cursor-pointer ${selectedMethod === 'offline'
            ? 'bg-success-100 border border-success-400 text-success-700'
            : 'bg-white border border-custom-gray-200 hover:bg-custom-gray-100'}`}>
          직접 만나기
        </button>
      </div>
    </div>
  );
};

