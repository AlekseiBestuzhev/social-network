import { ChangeEvent, FC, memo, useState } from 'react';

import { RiCheckFill } from 'react-icons/ri';

import { useAppDispatch } from '@/common/hooks/useAppDispatch.ts';
import { useAppSelector } from '@/common/hooks/useAppSelector.ts';
import { Button } from '@/components/Button/Button.tsx';
import { Input } from '@/components/Input/Input.tsx';
import cls from '@/features/profile/components/StatusControl/StatusModalContent/StatusModalContent.module.scss';
import { updateMyStatusTC } from '@/features/profile/profile-thunks.ts';
import { statusSelector } from '@/features/profile/selectors/statusSelector';

type PropsType = {
  onClose: () => void;
};

export const StatusModalContent: FC<PropsType> = memo(({ onClose }) => {
  const dispatch = useAppDispatch();

  const status = useAppSelector(statusSelector);

  const [statusString, setStatusString] = useState(status);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setStatusString(e.currentTarget.value);
  };

  const onClickHandler = async () => {
    await dispatch(updateMyStatusTC(statusString, onClose));
  };

  return (
    <div className={cls.wrapper}>
      <Input title="Enter new status" value={statusString} onChange={onChangeHandler} />
      <Button variant="main" size="large" onClick={onClickHandler}>
        Apply <RiCheckFill size="1.125rem" />
      </Button>
    </div>
  );
});
