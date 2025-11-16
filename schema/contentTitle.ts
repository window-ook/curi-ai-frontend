import { z } from 'zod';

const MIN_TITLE_LENGTH = 8;
const MAX_TITLE_LENGTH = 80;

/**
 * 콘텐츠 제목 스키마
 * @description 제목은 최소 8자, 최대 80자, 빈 문자열 불가
 */
export const contentTitleSchema = z.object({
  title: z.string()
    .min(MIN_TITLE_LENGTH, `${MIN_TITLE_LENGTH}자 이상 입력해주세요`)
    .max(MAX_TITLE_LENGTH, `${MAX_TITLE_LENGTH}자 이하로 입력해주세요`)
});

export type IContentTitleForm = z.infer<typeof contentTitleSchema>;
