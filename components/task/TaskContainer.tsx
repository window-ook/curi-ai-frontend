'use client';

import CategorySelector from '@/components/task/CategorySelector';
import Button from '@/components/ui/Button';
import { RepresentativeImage } from '@/components/task/RepresentativeImage';
import { AdditionalImages } from '@/components/task/AdditionalImages';
import { Category } from '@/components/task/Category';
import { ContentTitle } from '@/components/task/ContentTitle';
import { ActivityMethod } from '@/components/task/ActivityMethod';
import { DetailedInformation } from '@/components/task/DetailedInformation';
import { useCategoryStore } from '@/store/useCategoryStore';

export default function TaskContainer() {
  const { isSelecting } = useCategoryStore();

  return (
    <>
      {/* 카테고리 선택 화면 */}
      <div className={isSelecting ? 'block' : 'hidden'}>
        <CategorySelector />
      </div>

      {/* 메인 폼 화면 */}
      <article className={`mx-auto max-w-desktop px-5 py-8 grid md:grid-cols-2 grid-cols-1 gap-8 ${isSelecting ? 'hidden' : 'block'}`}>
        {/* 1열 - 이미지 업로드 컴포넌트*/}
        <section className="flex flex-col gap-8">
          <RepresentativeImage />
          <AdditionalImages />
        </section>

        {/* 2열 - 폼 컴포넌트 */}
        <section className="flex flex-col gap-12">
          <Category />
          <ContentTitle />
          <ActivityMethod />
          <DetailedInformation />
        </section>

        {/* 모바일 화면 '다음으로' 버튼 */}
        <Button
          type="button"
          variant="black"
          size="lg"
          disabled={true}
          disabledTextWhite={true}
          className="block rounded-lg md:hidden"
          fullWidth={true}
          ariaLabel="다음으로 버튼(모바일)"
        >
          다음으로
        </Button>
      </article>
    </>
  );
}
