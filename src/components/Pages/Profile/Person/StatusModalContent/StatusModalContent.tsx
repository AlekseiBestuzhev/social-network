import cls from '@/components/Pages/Profile/Person/StatusModalContent/StatusModalContent.module.scss';
import {statusSelector} from "@/features/profile/selectors/statusSelector/statusSelector.ts";
import {updateMyStatusThunkCreator} from '@/features/profile/profile-thunks.ts';
import {useAppDispatch, useAppSelector} from "@/app/hooks.ts";
import {Button} from '@/components/common/Button/Button';
import {Input} from '@/components/common/Input/Input';
import {RiCheckFill} from 'react-icons/ri';
import {FC, useState} from 'react';

type PropsType = {
    onClose: () => void
};

export const StatusModalContent: FC<PropsType> = (props) => {

    const dispatch = useAppDispatch();
    const status = useAppSelector(statusSelector);
    const [statusString, setStatusString] = useState(status);

    const onChangeHandler = (value: string) => {
        setStatusString(value);
    }

    const onClickHandler = async () => {
        await dispatch(updateMyStatusThunkCreator(statusString));
        props.onClose();
    }

    return (
        <div className={cls.wrapper}>
            <Input
                ID='status'
                title='Enter new status'
                value={statusString}
                onChange={onChangeHandler}
            />
            <Button mainColor='Main' size='large' onClick={onClickHandler}>
                Apply <RiCheckFill size={'1.125rem'}/>
            </Button>
        </div>
    )
}