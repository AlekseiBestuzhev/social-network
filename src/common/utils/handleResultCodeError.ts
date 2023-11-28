export const handleResultCodeError = (data: unknown) => {
    let message: string
    if (typeof data === 'object' && data !== null && 'messages' in data && Array.isArray(data.messages)) {
        message = data.messages[0]
    } else {
        message = 'Some error occurred'
    }

    return message
}