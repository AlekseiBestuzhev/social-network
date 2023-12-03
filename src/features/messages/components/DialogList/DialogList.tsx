import {messagesDataSelector} from "@/features/messages/selectors/messagesDataSelector";
import {dialogsDataSelector} from "@/features/messages/selectors/dialogsDataSelector";
import {Dialog} from "@/features/messages/components/DialogList/Dialog/Dialog.tsx";
import cls from '@/features/messages/components/DialogList/DialogList.module.scss'
import {useAppSelector} from "@/common/hooks/useAppDispatch.ts";

export const DialogList = () => {

	const dialogsData = useAppSelector(dialogsDataSelector);
	const messagesData = useAppSelector(messagesDataSelector);

	const dialogsList = dialogsData.length
			? dialogsData.map(el => {
				const lm = messagesData[el.id][messagesData[el.id].length - 1];
				const lastText = lm?.text || '';
				const lastDate = lm?.date || '';
				return (
					<Dialog
						key={el.id}
						id={el.id}
						name={el.name}
						avatar={el.avatar}
						lastMessage={lastText}
						lastDate={lastDate}
					/>)
			})
			: <span className={cls.emptyList}>Nobody needs you...</span>

	return (
		<ul className={cls.dialogItems}>
			{dialogsList}
		</ul>
	);
}