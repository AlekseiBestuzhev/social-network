export const validateImage = (
    file: File,
    maxSize: number,
    allowedTypes: string[]
): boolean => {
    const maxSizeInBytes = maxSize * 1024 * 1024
    if (file.size > maxSizeInBytes) {
        // toast.error('Max image size is 1MB', { containerId: 'common' })

        return false
    }

    if (!allowedTypes.includes(file.type)) {
        // const message = 'Only .jpg, .jpeg and .png formats are supported.'
        // toast.error( message, { containerId: 'common' })

        return false
    }

    return true
}