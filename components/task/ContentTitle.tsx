'use client';

import { useState } from 'react';

const MIN_LENGTH = 8;
const MAX_LENGTH = 80;

export const ContentTitle = () => {
  const [title, setTitle] = useState('');

  const characterCount = title.length;
  const isValid = characterCount >= MIN_LENGTH && characterCount <= MAX_LENGTH;

  return (
    <div className="w-full">
      <h2 className="mb-4 text-subtitle font-bold custom-black-900">콘텐츠 제목</h2>
      <div className={`h-36 p-4 rounded-lg border border-custom-gray-200 flex flex-col justify-between ${isValid
        ? 'border-success-400'
        : characterCount > 0
          ? 'border-error'
          : 'border-custom-gray-200'
        }`}>
        <input
          type="text"
          placeholder="제목을 입력해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={MAX_LENGTH}
          className="w-full text-custom-black-900 font-medium placeholder:text-custom-gray-700 focus:outline-none"
        />
        <p
          className={`text-sm font-medium text-right ${isValid ? 'text-custom-gray-700' : characterCount > 0 ? 'text-text-error' : 'text-custom-gray-700'}`}
        >
          {characterCount} / {MAX_LENGTH}자 (최소 {MIN_LENGTH}자)
        </p>
      </div>
    </div>
  );
};

