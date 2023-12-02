import {isAxiosError} from "axios";

export const handleServerError = (error: unknown) => {
    let message: string;
    if (isAxiosError(error)) {
        message = error.response?.statusText || error.message;
    } else {
        message = (error as Error).message;
    }

    return message
}