import {setNotification} from "@/features/service/service-reducer.ts";
import {AppDispatchType} from "@/common/hooks/useAppDispatch.ts";
import {noticeStatus} from "@/common/const";

export const validateImage = (
    file: File,
    maxSize: number,
    allowedTypes: string[],
    dispatch: AppDispatchType
): boolean => {
    const maxSizeInBytes = maxSize * 1024 * 1024
    if (file.size > maxSizeInBytes) {
        const message = `File size must be less than ${maxSize} MB.`
        dispatch(setNotification( noticeStatus.error,message))

        return false
    }

    if (!allowedTypes.includes(file.type)) {
        const message = 'Only .jpg, .jpeg and .png formats are supported.'
        dispatch(setNotification(noticeStatus.success, message))

        return false
    }

    return true
}