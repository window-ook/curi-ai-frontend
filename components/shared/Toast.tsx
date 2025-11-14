'use client';

import { useEffect } from 'react';

/**
 * 토스트 인터페이스
 * @property message - 토스트 메시지
 * @property isVisible - 토스트 표시 여부
 * @property onClose - 토스트 닫기 콜백
 * @property duration - 토스트 자동 닫힘 시간 (ms, 기본값: 3000)
 */
interface IToast {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

/**
 * 카테고리 초과 안내 토스트 컴포넌트
 * @param message - 표시할 메시지
 * @param isVisible - 토스트 표시 여부
 * @param onClose - 토스트 닫기 콜백
 * @param duration - 자동 닫힘 시간 (기본값: 3000ms)
 */
export default function Toast({
  message,
  isVisible,
  onClose,
  duration = 2000,
}: IToast) {
  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(() => { onClose() }, duration);
    return () => clearTimeout(timer);
  }, [isVisible, onClose, duration]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-28 md:bottom-8 left-0 right-0 z-50 px-4 animate-fade-in">
      <div className="mx-auto w-full md:w-1/4 px-6 py-4 rounded-lg shadow-lg bg-custom-black-600 text-center text-white">
        <p className="font-medium">{message}</p>
      </div>
    </div>
  );
}
