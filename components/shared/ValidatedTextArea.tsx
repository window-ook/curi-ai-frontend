'use client';

import { useState, useRef, useEffect } from 'react';
import { IValidatedTextarea } from '@/types/shared/validatedTextarea';

/**
 * 공통 유효성 검사 텍스트 영역 컴포넌트 - 콘텐츠 제목, 회차 정보의 활동 내용
 * @param value - 텍스트 영역의 값
 * @param onChange - 텍스트 영역의 값 변경 시 호출되는 함수
 * @param placeholder - 텍스트 영역의 플레이스홀더
 * @param minLength - 최소 길이
 * @param maxLength - 최대 길이
 * @param rows - 텍스트 영역의 행 수
 * @param error - React Hook Form의 에러 메시지 (우선 표시)
 * @param containerClassName - 컨테이너 추가 클래스
 * @param textareaClassName - 텍스트 영역 추가 클래스
 */
export default function ValidatedTextArea({
  value,
  onChange,
  placeholder,
  minLength,
  maxLength,
  rows,
  error,
  containerClassName = '',
  textareaClassName = ''
}: IValidatedTextarea) {
  const [isFocused, setIsFocused] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const characterCount = value.length;
  const isValid = characterCount >= minLength && characterCount <= maxLength;
  const hasError = error || (!isValid && characterCount > 0);

  // 모바일 화면에서 포커스 시 텍스트 영역이 화면 중앙에 위치하도록 스크롤
  const handleFocus = () => {
    setIsFocused(true);

    if (!textareaRef.current) return;

    const isMobile = window.innerWidth < 768;

    if (!isMobile) return;

    setTimeout(() => { textareaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 300);
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

  const getBorderColor = () => {
    if (!isFocused) return 'border-custom-gray-200';
    if (hasError) return 'border-error';
    if (isValid) return 'border-success-400';
    return 'border-custom-gray-200';
  };

  const displayErrorMessage = error || `${minLength}자 이상 입력해주세요`;

  return (
    <div
      className='relative'
      ref={containerRef}
    >
      <div className={`p-4 rounded-lg border flex flex-col ${containerClassName} ${getBorderColor()}`}>
        <textarea
          ref={textareaRef}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          maxLength={maxLength}
          rows={rows}
          className={`w-full focus:outline-none ${textareaClassName}`}
        />
        <p className={`text-sm font-medium text-right ${hasError ? 'text-error' : 'text-custom-gray-700'}`}>
          {characterCount} / {maxLength}자 (최소 {minLength}자)
        </p>
      </div>
      {hasError && (
        <p className="absolute bottom-0 left-0 translate-y-7 text-sm font-medium text-error">
          {displayErrorMessage}
        </p>
      )}
    </div>
  );
};
