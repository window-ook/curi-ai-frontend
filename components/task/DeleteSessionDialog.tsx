'use client';

import Button from '@/components/shared/Button';

export interface IDeleteSessionDialog {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteSessionDialog({
  isOpen,
  onConfirm,
  onCancel,
}: IDeleteSessionDialog) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 bg-opacity-50">
      <div className="w-full max-w-md mx-4 py-4 px-6 rounded-2xl bg-white">
        <div className="relative flex justify-end">
          <Button
            type="button"
            variant="black"
            size="nopadding"
            onClick={onCancel}
            className='bg-white hover:bg-white'
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#121212" strokeWidth="2">
              <path d="M19 5L5 19M5 5l14 14" />
            </svg>
          </Button>
        </div>

        {/* PC화면 / 모바일 */}
        <h3 className="hidden md:block mb-2 text-2xl font-bold text-center">
          작성된 내용을<br />삭제하시겠어요?
        </h3>
        <h3 className="block md:hidden mb-2 text-2xl font-bold text-center">
          작성된 내용을 삭제하시겠어요?
        </h3>

        <p className="mb-8 text-lg text-center text-custom-black-400">
          삭제한 내용은 복구할 수 없습니다.
        </p>
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            size="lg"
            fullWidth
            onClick={onCancel}
            className="rounded-lg"
          >
            취소
          </Button>
          <Button
            type="button"
            variant="black"
            size="lg"
            fullWidth
            onClick={onConfirm}
            className="rounded-lg"
          >
            삭제하기
          </Button>
        </div>
      </div>
    </div>
  );
}
