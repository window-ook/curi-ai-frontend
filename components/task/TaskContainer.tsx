'use client';

import CategorySelection from '@/components/task/CategorySelection';
import Button from '@/components/shared/Button';
import { useCategoryStore } from '@/store/useCategoryStore';
import { RepresentativeImage } from '@/components/task/RepresentativeImage';
import { AdditionalImages } from '@/components/task/AdditionalImages';
import { Category } from '@/components/task/Category';
import { ContentTitle } from '@/components/task/ContentTitle';
import { ActivityMethod } from '@/components/task/ActivityMethod';
import { DetailedInfo } from '@/components/task/DetailedInfo';

export default function TaskContainer() {
  const { isSelecting } = useCategoryStore();

  if (isSelecting) return <CategorySelection />;

  return (
    <div className="mx-auto max-w-desktop px-5 py-8">
      <div className="grid min-[768px]:grid-cols-2 grid-cols-1 gap-8">
        {/* 1열 - 이미지 업로드 컴포넌트*/}
        <div className="flex flex-col gap-8">
          <RepresentativeImage />
          <AdditionalImages />
        </div>

        {/* 2열 - 폼 컴포넌트 */}
        <div className="flex flex-col gap-8">
          <Category />
          <ContentTitle />
          <ActivityMethod />
          <DetailedInfo />
        </div>

        {/* 모바일 화면 '다음으로' 버튼 */}
        <Button
          type="button"
          variant="black"
          size="lg"
          disabled={true}
          disabledTextWhite={true}
          className="block rounded-lg md:hidden"
          fullWidth={true}
        >
          다음으로
        </Button>
      </div>
    </div>
  );
}
