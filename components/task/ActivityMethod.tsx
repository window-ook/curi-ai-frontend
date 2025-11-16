'use client';

import Button from '@/components/shared/Button';
import { useState } from 'react';

export const ActivityMethod = () => {
  const [selectedMethod, setSelectedMethod] = useState<'online' | 'offline'>('online');

  return (
    <section className="w-full flex flex-col gap-4">
      <h2 className="text-subtitle font-bold text-custom-black-900">활동 방식 선택</h2>
      <p className="text-xl text-custom-gray-700 font-medium">만남을 어떤 방식으로 진행하시겠어요?</p>
      <div className="flex gap-3">
        <Button
          type="button"
          variant={selectedMethod === 'online' ? 'success-active' : 'outline'}
          size='lg'
          fullWidth={true}
          onClick={() => setSelectedMethod('online')}
          ariaLabel="온라인 선택"
        >
          온라인
        </Button>
        <Button
          type="button"
          variant={selectedMethod === 'offline' ? 'success-active' : 'outline'}
          size='lg'
          fullWidth={true}
          onClick={() => setSelectedMethod('offline')}
          ariaLabel="직접 만나기 선택"
        >
          직접 만나기
        </Button>
      </div>
    </section>
  );
};
