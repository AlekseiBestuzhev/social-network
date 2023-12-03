import {AppDispatchType} from "@/common/hooks/useAppDispatch.ts";
import {setAppError} from "@/features/service/service-reducer.ts";

export const validateImage = (
    file: File,
    maxSize: number,
    allowedTypes: string[],
    dispatch: AppDispatchType
): boolean => {
    const maxSizeInBytes = maxSize * 1024 * 1024
    if (file.size > maxSizeInBytes) {
        dispatch(setAppError(`Max image size is ${maxSize} MB`))

        return false
    }

    if (!allowedTypes.includes(file.type)) {
        const message = 'Only .jpg, .jpeg and .png formats are supported.'
        dispatch(setAppError(message))

        return false
    }

    return true
}