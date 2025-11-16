'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contentTitleSchema, IContentTitleForm } from '@/schema/contentTitle';
import { ValidatedTextArea } from '@/components/shared/ValidatedTextArea';

const MIN_LENGTH = 8;
const MAX_LENGTH = 80;

export const ContentTitle = () => {
  const form = useForm<IContentTitleForm>({
    resolver: zodResolver(contentTitleSchema),
    defaultValues: {
      title: ''
    }
  });

  return (
    <div>
      <h2 className="mb-4 text-subtitle font-bold text-custom-black-900">콘텐츠 제목</h2>
      <Controller
        name="title"
        control={form.control}
        render={({ field, fieldState }) => (
          <ValidatedTextArea
            value={field.value}
            onChange={field.onChange}
            placeholder="제목을 입력해주세요"
            minLength={MIN_LENGTH}
            maxLength={MAX_LENGTH}
            error={fieldState.error?.message}
            containerClassName="h-36 justify-between"
            textareaClassName="h-20 font-medium placeholder:text-custom-gray-700 text-custom-black-900"
          />
        )}
      />
    </div>
  );
};
