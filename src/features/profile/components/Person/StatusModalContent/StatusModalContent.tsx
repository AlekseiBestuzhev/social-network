import cls from '@/features/profile/components/Person/StatusModalContent/StatusModalContent.module.scss';
import {statusSelector} from "@/features/profile/selectors/statusSelector";
import {updateMyStatusTC} from '@/features/profile/profile-thunks.ts';
import {useAppDispatch, useAppSelector} from "@/app/hooks.ts";
import {Button} from '@/components/Button/Button.tsx';
import {Input} from '@/components/Input/Input.tsx';
import {RiCheckFill} from 'react-icons/ri';
import {FC, memo, useState} from 'react';

type PropsType = {
   onClose: () => void
};

export const StatusModalContent: FC<PropsType> = memo(({onClose}) => {

   const dispatch = useAppDispatch();

   const status = useAppSelector(statusSelector);

   const [statusString, setStatusString] = useState(status);

   const onChangeHandler = (value: string) => {
      setStatusString(value);
   }

   const onClickHandler = async () => {
      try {
         await dispatch(updateMyStatusTC(statusString));
         onClose();
      } catch(err) {
         console.log(err);
      }
   }

   return (
      <div className={cls.wrapper}>
         <Input
            ID='status'
            title='Enter new status'
            value={statusString}
            onChange={onChangeHandler}
         />
         <Button variant='main' size='large' onClick={onClickHandler}>
            Apply <RiCheckFill size={'1.125rem'}/>
         </Button>
      </div>
   )
})