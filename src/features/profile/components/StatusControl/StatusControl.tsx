import {StatusModalContent} from "./StatusModalContent/StatusModalContent.tsx";
import {CSSProperties, FC, useCallback, useState} from "react";
import {Modal} from "@/components/Modal/Modal.tsx";

type Props = {
    isMe: boolean
    status: string
}

export const StatusControl: FC<Props> = ({isMe, status}) => {
    const [statusEditMode, setStatusEditMode] = useState(false);

    const openStatusModal = useCallback(() => {
        if (isMe) setStatusEditMode(true);
    }, []);

    const closeStatusModal = useCallback(() => {
        setStatusEditMode(false);
    }, []);

    const noStatusPlaceholder = isMe ? 'Enter status...' : ''

    const pointer: CSSProperties = {
        cursor: isMe ? 'pointer' : 'initial'
    }

    return (
        <>
            {
                isMe && <Modal onClose={closeStatusModal} opened={statusEditMode}>
                    <StatusModalContent onClose={closeStatusModal}/>
                </Modal>
            }
            <p style={pointer} onClick={openStatusModal}>
                {
                    status
                        ? status
                        : noStatusPlaceholder
                }
            </p>
        </>
    );
};