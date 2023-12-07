import {noticeMessageSelector} from "@/features/service/selectors/noticeMessageSelector";
import {noticeStatusSelector} from "@/features/service/selectors/noticeStatusSelector";
import {setNotification} from "@/features/service/service-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {RiErrorWarningFill} from "react-icons/ri";
import {noticeStatus} from "@/common/const";
import cls from './Toast.module.scss'
import classNames from "classnames";
import {useEffect} from "react";

export const Toast = () => {
    const currentNoticeStatus = useAppSelector(noticeStatusSelector)
    const currentNoticeMessage = useAppSelector(noticeMessageSelector)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (currentNoticeStatus) {
            const timeoutId = setTimeout(() => {
                dispatch(setNotification(noticeStatus.null, null))
                clearTimeout(timeoutId)
            }, 6000);
        }
    }, [currentNoticeStatus]);

    const classes = {
        root: classNames(cls.root, currentNoticeStatus && cls[currentNoticeStatus]),
    }

    if (!currentNoticeStatus) return null

    return (
        <div className={classes.root}>
            <div className={cls.content}>
                <RiErrorWarningFill size={24}/>
                <p className={cls.text}>{currentNoticeMessage}</p>
            </div>
        </div>
    )
}