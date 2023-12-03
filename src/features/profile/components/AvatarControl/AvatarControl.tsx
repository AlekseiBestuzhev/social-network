import {AvatarModalContent} from "./AvatarModalContent/AvatarModalContent.tsx";
import {Avatar} from "@/components/Avatar/Avatar.tsx";
import {Modal} from "@/components/Modal/Modal.tsx";
import {FC, useCallback, useState} from "react";

type Props = {
    photo: string | null
    fullName: string
}

export const AvatarControl: FC<Props> = ({photo, fullName}) => {
    const [photoIsOpen, setPhotoIsOpen] = useState(false);

    const openPhotoModal = useCallback(() => {
        setPhotoIsOpen(true);
    }, []);

    const closePhotoModal = useCallback(() => {
        setPhotoIsOpen(false);
    }, []);

    return (
        <>
            <Avatar size='12.5rem' photo={photo} border onClick={openPhotoModal} turnOffCursorPointer={!photo}/>
            {
                photo && <Modal onClose={closePhotoModal} opened={photoIsOpen}>
                    <AvatarModalContent photo={photo} name={fullName}/>
                </Modal>
            }</>
    )
}