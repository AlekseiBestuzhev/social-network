import { FC, memo, useState } from 'react';

import classNames from 'classnames';

import cls from './StatusControl.module.scss';
import { StatusModalContent } from './StatusModalContent/StatusModalContent.tsx';

import { useResize } from '@/common/hooks/useResize.ts';
import { Modal } from '@/components/Modal/Modal.tsx';

type Props = {
  isMe: boolean;
  status: string;
};

export const StatusControl: FC<Props> = memo(({ isMe, status }) => {
  const [statusEditMode, setStatusEditMode] = useState(false);

  const ref = useResize({
    targetSize: 128, // 8rem = 128px
    onResize: isTargetSize => {
      if (isTargetSize) {
        ref.current!.style.textAlign = 'left';
      } else {
        ref.current!.style.textAlign = 'center';
      }
    },
  });

  const openStatusModal = () => {
    if (isMe) setStatusEditMode(true);
  };
  const closeStatusModal = () => {
    setStatusEditMode(false);
  };

  const noStatusPlaceholder = 'Enter status...';

  const classes = { status: classNames(cls.status, { [cls.pointer]: isMe }) };

  if (!isMe && !status) return null;

  return (
    <div className={cls.root}>
      {isMe && (
        <Modal onClose={closeStatusModal} opened={statusEditMode}>
          <StatusModalContent onClose={closeStatusModal} />
        </Modal>
      )}
      <p className={classes.status} onClick={openStatusModal} ref={ref}>
        {status || noStatusPlaceholder}
      </p>
    </div>
  );
});
