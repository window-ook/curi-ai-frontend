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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 1열 - 이미지 파일 업로드 컴포넌트*/}
            <div className="flex flex-col">
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
            <button
              type="button"
              className="md:hidden block w-full px-5 py-3 rounded-md bg-custom-gray-300 text-lg font-semibold text-white cursor-pointer">
              다음으로
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
