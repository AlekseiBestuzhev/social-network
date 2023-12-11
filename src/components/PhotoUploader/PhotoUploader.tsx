import { ChangeEvent, ComponentPropsWithoutRef, ElementType, ReactNode, useRef } from 'react';

import { RiDownload2Fill } from 'react-icons/ri';

import { Button } from '@/components/Button/Button.tsx';

type FileUploaderProps<T extends ElementType = 'button'> = {
  name: string;
  as?: T;
  accept?: string;
  className?: string;
  asProps?: T extends keyof JSX.IntrinsicElements ? JSX.IntrinsicElements[T] : any;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, 'onChange'>;

export const PhotoUploader = <T extends ElementType = 'button'>(
  props: FileUploaderProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof FileUploaderProps<T>>,
) => {
  const {
    name,
    onChange,
    accept = '',
    as: WrapperComponent = Button,
    asProps = { variant: 'main', size: 'large' } as const,
    children,
    ...rest
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <WrapperComponent onClick={() => inputRef?.current?.click()} {...asProps} {...rest}>
        {children ?? <RiDownload2Fill size={16} />}
      </WrapperComponent>
      <input
        ref={inputRef}
        name={name}
        type="file"
        style={{ display: 'none' }}
        onChange={onChange}
        accept={accept}
      />
    </>
  );
};
