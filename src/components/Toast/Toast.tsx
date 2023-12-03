import {appErrorSelector} from "@/features/service/selectors/appErrorSelector";
import {setAppError} from "@/features/service/service-reducer.ts";
import {useAppDispatch, useAppSelector} from "@/common/hooks/useAppDispatch.ts";
import {RiErrorWarningFill} from "react-icons/ri";
import cls from './Toast.module.scss'
import {useEffect} from "react";

export const Toast = () => {
    const dispatch = useAppDispatch()

    const error = useAppSelector(appErrorSelector)

    useEffect(() => {
        if (error) {
            const timeoutId = setTimeout(() => {
                dispatch(setAppError(null))
                clearTimeout(timeoutId)
            }, 6000);
        }
    }, [error]);

    if (!error) return null

    return (
        <div className={cls.root}>
            <div className={cls.content}>
                <RiErrorWarningFill size={24}/>
                <p className={cls.text}>{error}</p>
            </div>
        </div>
    )
}