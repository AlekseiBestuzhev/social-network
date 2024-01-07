import { PropsWithChildren, useEffect, useRef, KeyboardEvent } from 'react';
import { useController, useForm } from 'react-hook-form';
import cls from '@/components/AddItemForm/AddItemForm.module.scss';
import { Button } from '@/components/Button/Button';

type Form = {
  message: string;
};

type Props = {
  placeholder: string;
  onSubmit: (data: Form) => void;
} & PropsWithChildren;

export const AddItemForm = ({ placeholder, onSubmit, children }: Props) => {
  const { control, handleSubmit, watch } = useForm<Form>();

  const messageText = watch('message');

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '0px';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;

      const maxHeight = 200;

      if (textareaRef.current.scrollHeight > maxHeight) {
        textareaRef.current.style.overflowY = 'scroll';
        textareaRef.current.style.height = `${maxHeight}px`;
      } else {
        textareaRef.current.style.overflowY = 'hidden';
      }
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (messageText?.trim()) {
        handleSubmit(onSubmitForm);
        alert('enter');
      }
    }
  };

  const onSubmitForm = (data: Form) => {
    onSubmit(data);
    alert(JSON.stringify(data));
  };

  const {
    field: { ref, ...rest },
    fieldState: { error },
  } = useController({ name: 'message', control });

  useEffect(() => {
    adjustTextareaHeight();
  }, [messageText]);

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className={cls.wrapper}>
      <textarea
        className={`${cls.textarea} ${error && cls.errorMessage}`}
        placeholder={error ? error.message : placeholder}
        onKeyDown={onKeyDown}
        ref={textareaRef}
        {...rest}
      />
      <Button variant="submit" disabled={!messageText?.trim()}>
        {children}
      </Button>
    </form>
  );
};
