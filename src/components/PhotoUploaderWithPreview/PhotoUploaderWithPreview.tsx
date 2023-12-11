import { ChangeEvent, FC } from 'react';

import classNames from 'classnames';

import cls from './PhotoUploaderWithPreview.module.scss';

import { Avatar } from '@/components/Avatar/Avatar.tsx';
import { PhotoUploader } from '@/components/PhotoUploader/PhotoUploader.tsx';

type Props = {
  name: string;
  image: string | null;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

export const PhotoUploaderWithPreview: FC<Props> = ({ name, image, onChange, className }) => {
  const classes = classNames(cls.root, className);

  return (
    <div className={classes}>
      <Avatar photo={image} size="10rem" />
      <PhotoUploader name={name} onChange={onChange} className={cls.button} />
    </div>
  );
};
