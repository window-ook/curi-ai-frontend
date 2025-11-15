'use client';

import { useState, useRef, useEffect } from 'react';

const MIN_LENGTH = 8;
const MAX_LENGTH = 80;

export const ContentTitle = () => {
  const [title, setTitle] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const characterCount = title.length;
  const isValid = characterCount >= MIN_LENGTH && characterCount <= MAX_LENGTH;

  // 모바일 스크롤 처리
  const handleFocus = () => {
    setIsFocused(true);

    if (!textareaRef.current) return;

    const isMobile = window.innerWidth < 768;

    if (!isMobile) return;

    setTimeout(() => { textareaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }) }, 300);
  };

  const handleBlur = () => setIsFocused(false);

  // 빈 영역 클릭시 포커스 해제
  useEffect(() => {
    const handleClickEmptyArea = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node) && textareaRef.current) textareaRef.current.blur();
    };

    document.addEventListener('mousedown', handleClickEmptyArea);
    return () => document.removeEventListener('mousedown', handleClickEmptyArea);
  }, []);

  return (
    <div className='relative'>
      <div className="w-full" ref={containerRef}>
        <h2 className="mb-4 text-subtitle font-bold">콘텐츠 제목</h2>
        <div className={`h-36 p-4 rounded-lg border flex flex-col justify-between
          ${isFocused
            ? isValid
              ? 'border-success-400'
              : characterCount > 0
                ? 'border-error'
                : 'border-custom-gray-200'
            : 'border-custom-gray-200'
          }`}>
          <textarea
            ref={textareaRef}
            placeholder="제목을 입력해주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            maxLength={MAX_LENGTH}
            className="w-full h-20 font-medium placeholder:text-custom-gray-700 focus:outline-none"
          />
          <p className={`text-sm font-medium text-right ${isValid ? 'text-custom-gray-700' : characterCount > 0 ? 'text-text-error' : 'text-custom-gray-700'}`}>
            {characterCount} / {MAX_LENGTH}자 (최소 {MIN_LENGTH}자)
          </p>
        </div>
      </div>
      {!isValid && characterCount > 0 && (
        <p className="absolute bottom-0 left-0 translate-y-7 text-sm font-medium text-error">
          {MIN_LENGTH}자 이상 입력해주세요
        </p>
      )}
    </div>
  );
};

