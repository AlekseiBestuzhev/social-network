import cls from '@/components/Pages/Profile/Person/StatusModalContent/StatusModalContent.module.scss';
import { updateMyStatusThunkCreator } from '@/redux/profile/profile-thunks';
import { ProfilePageType } from '@/redux/profile/profile-reducer';
import { Button } from '@/components/common/Button/Button';
import { Input } from '@/components/common/Input/Input';
import { AppStateType } from '@/redux/redux-store';
import { RiCheckFill } from 'react-icons/ri';
import { connect } from 'react-redux';
import { Component } from 'react';

type StateType = {
	value: string
}

type PropsType = MSTPtype & MDTPtype & {
	onClose: () => void
};

class StatusModal extends Component<PropsType, StateType> {

	constructor(props: PropsType) {
		super(props);
		this.state = {
			value: this.props.status
		}
	}

	onChangeHandler(value: string) {
		this.setState({
			value
		});
	}

	onClickHandler() {
		this.props.updateMyStatusThunkCreator(this.state.value)
		this.props.onClose()
	}

	render() {
		return (
			<div className={cls.wrapper}>
				<Input
					ID='status'
					title='Enter new status'
					value={this.state.value}
					onChange={this.onChangeHandler.bind(this)}
				/>
				<Button mainColor='Main' size='large' onClick={this.onClickHandler.bind(this)}>
					Apply <RiCheckFill size={'1.125rem'} />
				</Button>
			</div>
		)
	}
}

type MDTPtype = {
	updateMyStatusThunkCreator: (status: string) => void
}

type MSTPtype = Pick<ProfilePageType, 'status'>;

const MSTP = (state: AppStateType): MSTPtype => ({
	status: state.profilePage.status
})

export const StatusModalContent = connect(MSTP, {
	updateMyStatusThunkCreator
} as MDTPtype)(StatusModal);