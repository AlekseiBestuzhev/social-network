import { AvatarModalContent } from '@/components/Pages/Profile/Person/AvatarModalContent/AvatarModalContent';
import { StatusModalContent } from '@/components/Pages/Profile/Person/StatusModalContent/StatusModalContent';
import cls from '@/components/Pages/Profile/Person/Person.module.scss';
import { ProfilePropsType } from '@/components/Pages/Profile/Profile';
import anotherUserBcg from '@/assets/images/another-user.jpg';
import { Avatar } from '@/components/common/Avatar/Avatar';
import profileBcg from '@/assets/images/profile-bcg.jpeg';
import { Modal } from '@/components/common/Modal/Modal';
import classNames from 'classnames';
import { Component } from 'react';

type PersonPropsType = Pick<ProfilePropsType, 'profile' | 'isMe' | 'status'>;

type StateType = {
	photoOpen: boolean,
	statusEditMode: boolean
}

export class Person extends Component<PersonPropsType, StateType> {

	constructor(props: PersonPropsType) {
		super(props);
		this.state = {
			photoOpen: false,
			statusEditMode: false
		};
	}

	openPhotoModal = () => {
		this.setState({
			photoOpen: true
		})
	}

	closePhotoModal = () => {
		this.setState({
			photoOpen: false
		})
	}

	openStatusModal = () => {
		if (this.props.isMe) {
			this.setState({
				statusEditMode: true
			})
		}
	}

	closeStatusModal = () => {
		this.setState({
			statusEditMode: false
		})
	}

	render() {

		const userName = this.props.profile.fullName;
		const photo = this.props.profile.photos.large;

		const statusStyles = classNames(cls.status, {
			[cls.pointer]: this.props.isMe
		})

		return (
			<section>
				<img className={cls.header}
					src={this.props.isMe ? profileBcg : anotherUserBcg}
					alt={'Stars'}
				/>
				<div className={cls.person}>
					<div className={cls.info}>
						<Avatar size='12.5rem' photo={photo} border onClick={this.openPhotoModal} />
						{
							photo && <Modal onClose={this.closePhotoModal} opened={this.state.photoOpen}>
								<AvatarModalContent photo={photo} name={userName} />
							</Modal>
						}
						<Modal onClose={this.closeStatusModal} opened={this.state.statusEditMode}>
							<StatusModalContent onClose={this.closeStatusModal} />
						</Modal>
						<div className={cls.about}>
							<p className={statusStyles} onClick={this.openStatusModal}>
								{
									this.props.status
										? this.props.status
										: this.props.isMe
											? 'Enter status...'
											: ''
								}
							</p>
							<h2 className={cls.name}>{userName}</h2>
						</div>
					</div>
					{this.props.children}
				</div>
			</section>
		);
	}
}