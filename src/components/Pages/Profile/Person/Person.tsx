import { AvatarModalContent } from '@/components/Pages/Profile/Person/AvatarModalContent/AvatarModalContent';
import { StatusModalContent } from '@/components/Pages/Profile/Person/StatusModalContent/StatusModalContent';
import cls from '@/components/Pages/Profile/Person/Person.module.scss';
import { ProfilePropsType } from '@/components/Pages/Profile/Profile';
import anotherUserBcg from '@/assets/images/another-user.jpg';
import { Avatar } from '@/components/common/Avatar/Avatar';
import profileBcg from '@/assets/images/profile-bcg.jpeg';
import { Modal } from '@/components/common/Modal/Modal';
import classNames from 'classnames';
import {FC, ReactNode, useState} from "react";

type PersonPropsType = Pick<ProfilePropsType, 'profile' | 'isMe' | 'status'> & {
	children: ReactNode
};

export const Person: FC<PersonPropsType> = (props) => {

	const [photoIsOpen, setPhotoIsOpen] = useState(false);
	const [statusEditMode, setStatusEditMode] = useState(false);

	const openPhotoModal = () => {
		setPhotoIsOpen(true);
	}

	const closePhotoModal = () => {
		setPhotoIsOpen(false);
	}

	const openStatusModal = () => {
		setStatusEditMode(true);
	}

	const closeStatusModal = () => {
		setStatusEditMode(false);
	}

		const userName = props.profile.fullName;
		const photo = props.profile.photos.large;

		const statusStyles = classNames(cls.status, {
			[cls.pointer]: props.isMe
		})

		return (
			<section>
				<img className={cls.header}
					src={props.isMe ? profileBcg : anotherUserBcg}
					alt={'Stars'}
				/>
				<div className={cls.person}>
					<div className={cls.info}>
						<Avatar size='12.5rem' photo={photo} border onClick={openPhotoModal} />
						{
							photo && <Modal onClose={closePhotoModal} opened={photoIsOpen}>
								<AvatarModalContent photo={photo} name={userName} />
							</Modal>
						}
						{
						props.isMe && <Modal onClose={closeStatusModal} opened={statusEditMode}>
							<StatusModalContent onClose={closeStatusModal} />
						</Modal>
						}
						<div className={cls.about}>
							<p className={statusStyles} onClick={openStatusModal}>
								{
									props.status
										? props.status
										: props.isMe
											? 'Enter status...'
											: ''
								}
							</p>
							<h2 className={cls.name}>{userName}</h2>
						</div>
					</div>
					{props.children}
				</div>
			</section>
		);
	}