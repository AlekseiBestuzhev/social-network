export const noticeStatus = {
  success: 'success',
  error: 'error',
  info: 'info',
  null: null,
} as const;

export type NoticeStatus = (typeof noticeStatus)[keyof typeof noticeStatus];
