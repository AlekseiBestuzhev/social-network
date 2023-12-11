import { isAxiosError } from 'axios';

export const handleServerError = (error: unknown) => {
  let message: string;

  if (
    typeof error === 'object' &&
    error !== null &&
    'messages' in error &&
    Array.isArray(error.messages) &&
    error.messages.length
  ) {
    message = error.messages[0];
  } else if (isAxiosError(error)) {
    message = error.response?.statusText || error.message;
  } else {
    message = (error as Error).message;
  }

  return message;
};
