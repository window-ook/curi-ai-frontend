'use client';

import Button from '@/components/shared/Button';

export const Navbar = () => {
  // 버튼 로직 추가 필요
  return (
    <header className="fixed z-50 top-0 left-0 right-0 h-16 border-b border-custom-gray-300 bg-white">
      <div className="relative max-w-desktop h-full mx-auto px-5 flex items-center justify-between">
        <h1 className="w-full text-2xl font-bold text-center">과제</h1>
        <Button
          type="button"
          variant='black'
          size='navbar'
          disabled={true}
          disabledTextWhite={true}
          className='hidden md:block absolute right-5 w-30'
        >
          다음으로
        </Button>
      </div>
    </header>
  );
};
