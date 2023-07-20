import { NewMessageContainer } from '@/components/Pages/Messages/CurrentDialog/NewMessage/NewMessageContainer';
import { DialogWindow } from '@/components/Pages/Messages/CurrentDialog//DialogWindow/DialogWindow';
import cls from '@/components/Pages/Messages/CurrentDialog/CurrentDialog.module.scss';
import { MessageType } from '@/redux/messages/messages-reducer';
import { RiSendPlaneFill } from 'react-icons/ri';
import { RiAlignRight } from 'react-icons/ri';
import { FC } from 'react';

export type CurrentDialogPropsType = {
	userID: string,
	messagesData: MessageType[],
	name: string
}

export const CurrentDialog: FC<CurrentDialogPropsType> = ({ userID, messagesData, name }) => {

	return (
		<div className={cls.wrapper}>
			<div className={cls.header}>
				<h4 className={cls.name}>{name}</h4>
				<RiAlignRight className={cls.menuIcon} onClick={() => alert('There will be a drop-down list')} />
			</div>
			<DialogWindow userID={userID} messagesData={messagesData} />
			<div className={cls.formWrapper}>
				<NewMessageContainer placeholder='Enter a message...'>
					Send <RiSendPlaneFill />
				</NewMessageContainer>
			</div>
		</div>
	);
}