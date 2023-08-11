import {CurrentDialog} from "@/features/messages/components/CurrentDialog/CurrentDialog.tsx";
import {DialogList} from "@/features/messages/components/DialogList/DialogList.tsx";
import {setCurrentDialog} from "@/features/messages/messages-reducer.ts";
import { SectionInfo } from '@/components/SectionInfo/SectionInfo';
import cls from '@/pages/Messages/Messages.module.scss';
import picture from '@/assets/images/messages.gif';
import {useAppDispatch} from "@/app/hooks.ts";
import {useMatch} from "react-router-dom";
import {useEffect} from "react";

export const Messages = () => {

	const currentUserID = useMatch('/messages/:userID')?.params.userID;
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (currentUserID) {
			dispatch(setCurrentDialog(currentUserID));
		}
	}, [currentUserID]);

	return (
		<div className={cls.page}>
			<div className={cls.leftColumn}>
				<h2 className={cls.title}>Dialogs</h2>
				<DialogList />
			</div>
			{
				currentUserID
					? <CurrentDialog userID={currentUserID}/>
					: <SectionInfo text='Choose the dialog...' picture={picture} size='16rem' />
			}
		</div>
	)
}