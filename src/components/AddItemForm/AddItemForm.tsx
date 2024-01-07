import { PropsWithChildren, KeyboardEvent, useEffect } from 'react';

import { useController, useForm } from 'react-hook-form';

import { useAdjustableTextarea } from '@/common/hooks/useAdjustableTextarea';
import cls from '@/components/AddItemForm/AddItemForm.module.scss';
import { Button } from '@/components/Button/Button';

export type AddItemFormData = {
  message: string;
};

type Props = {
  placeholder: string;
  onSubmit: (data: AddItemFormData) => void;
} & PropsWithChildren;

export const AddItemForm = ({ placeholder, onSubmit, children }: Props) => {
  const { textareaRef, adjustTextareaHeight } = useAdjustableTextarea(200);

  const { control, handleSubmit, watch, reset } = useForm<AddItemFormData>();
  const messageText = watch('message');
  const messageTextExists = messageText?.trim().length;

  const {
    field: { ref, ...rest },
    fieldState: { error },
  } = useController({ name: 'message', control });

  const onSubmitHandler = (data: AddItemFormData) => {
    onSubmit(data);
    reset({ message: '' });
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (messageTextExists) {
        handleSubmit(onSubmitHandler)();
      }
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [messageText]);

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className={cls.wrapper}>
      <textarea
        className={`${cls.textarea} ${error && cls.errorMessage}`}
        placeholder={error ? error.message : placeholder}
        onKeyDown={onKeyDown}
        ref={textareaRef}
        {...rest}
      />
      <Button variant="submit" disabled={!messageTextExists}>
        {children}
      </Button>
    </form>
  );
};
