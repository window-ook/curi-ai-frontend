import Button from '@/components/shared/Button';
import { Navbar } from '@/components/shared/Navbar';
import { RepresentativeImage } from '@/components/task/RepresentativeImage';
import { AdditionalImages } from '@/components/task/AdditionalImages';
import { Category } from '@/components/task/Category';
import { ContentTitle } from '@/components/task/ContentTitle';
import { ActivityMethod } from '@/components/task/ActivityMethod';
import { DetailedInfo } from '@/components/task/DetailedInfo';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-16">
        <div className="max-w-desktop mx-auto px-5 py-8">
          <div className="grid grid-cols-1 min-[768px]:grid-cols-2 gap-8">
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
            <Button
              type="button"
              variant='black'
              size='lg'
              disabled={true}
              disabledTextWhite={true}
              className='md:hidden block rounded-lg'
              fullWidth={true}
            >
              다음으로
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
