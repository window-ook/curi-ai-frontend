'use client';

export const Navbar = () => {
  // 버튼 로직 추가 필요
  return (
    <header className="fixed z-50 top-0 left-0 right-0 h-16 border-b border-custom-gray-300 bg-white">
      <div className="relative max-w-desktop h-full mx-auto px-5 flex items-center justify-between">
        <h1 className="w-full text-2xl font-bold text-custom-black-900 text-center">과제</h1>
        <button
          type="button"
          className="hidden md:block absolute right-5 w-30 px-3 py-2 rounded bg-custom-gray-300 text-base font-semibold text-white cursor-pointer">
          다음으로
        </button>
      </div>
    </header>
  );
};
