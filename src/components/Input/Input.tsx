import { FC, forwardRef, InputHTMLAttributes, Ref } from 'react';

import classNames from 'classnames';

import cls from '@/components/Input/Input.module.scss';

type PropsType = InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> & {
  title?: string;
  error?: string;
  multiline?: boolean;
};

export const Input: FC<PropsType> = forwardRef(
  (
    { title, error, placeholder, multiline, ...restProps },
    ref: Ref<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const placeholderClasses = classNames(cls.message, { [cls.error]: error });

    const inputClasses = classNames(cls.input, {
      [cls.textarea]: multiline,
      [cls.error]: error,
    });

    const InputElement = multiline ? 'textarea' : 'input';

    return (
      <label className={cls.wrapper}>
        {title && <p className={cls.title}>{title}:</p>}
        <InputElement ref={ref as any} {...restProps} className={inputClasses} />
        <span className={placeholderClasses}>{error || placeholder}</span>
      </label>
    );
  },
);
