import { ChangeEvent, Component, ReactNode, KeyboardEvent, createRef } from 'react';
import cls from '@/components/common/AddItemForm/AddItemForm.module.scss';
import { Button } from '@/components/common/Button/Button';
import { AppRootStateType } from '@/app/store.ts';
import { connect } from 'react-redux';

export type AddItemFormType = MapStateToPropsType & {
	placeholder: string,
	children: ReactNode,
	currentText: string,
	updateCurrentText: (text: string) => void,
	addText: (userID: string, name: string, photo: string | null) => void,
	userID: number | null,
	name: string | null,
	avatar: string | null
}

export type AddItemFormState = {
	error: string
};

export class AddItemFormContainer extends Component<AddItemFormType, AddItemFormState> {

	private textareaRef: React.RefObject<HTMLTextAreaElement>;

	constructor(props: AddItemFormType) {
		super(props);
		this.state = {
			error: '',
		};
		this.textareaRef = createRef();
	}

	componentDidMount() {
		this.adjustTextareaHeight();
	}

	componentDidUpdate(prevProps: AddItemFormType) {
		if (prevProps.currentText !== this.props.currentText) {
			this.adjustTextareaHeight();
		}
	}

	adjustTextareaHeight() {
		if (this.textareaRef.current) {
			this.textareaRef.current.style.height = '0px';
			this.textareaRef.current.style.height = this.textareaRef.current.scrollHeight + 'px'; // addind on shift + enter

			const maxHeight = 200; // in px
			if (this.textareaRef.current.scrollHeight > maxHeight) {
				this.textareaRef.current.style.overflowY = 'scroll';
				this.textareaRef.current.style.height = maxHeight + 'px';
			} else {
				this.textareaRef.current.style.overflowY = 'hidden';
			}
		}
	}

	onChangeHandler(e: ChangeEvent<HTMLTextAreaElement>): void {
		if (this.state.error) {
			this.setState({ error: '' });
		}
		this.props.updateCurrentText(e.currentTarget.value);
	}

	onKeyDownAdd(e: KeyboardEvent<HTMLTextAreaElement>): void {
		if (e.key === 'Enter') {
			if (!e.shiftKey) {
				e.preventDefault();
				this.addTextHandler();
			}
		}
	}

	addTextHandler() {
		const trimmedText = this.props.currentText.trim();
		if (!trimmedText) {
			this.setState({ error: 'Text is required' });
			this.props.updateCurrentText('');
		} else {
			this.props.updateCurrentText(trimmedText);
			this.state.error && this.setState({ error: '' });
			const senderID = `${this.props.userID}` || 'unknown';
			const senderName = this.props.name || 'unknown';
			this.props.addText(senderID, senderName, this.props.avatar);
		}
	}

	render() {
		return (
			<div className={cls.wrapper}>
				<textarea
					className={`${cls.textarea} ${this.state.error && cls.errorMessage}`}
					value={this.props.currentText}
					placeholder={this.state.error || this.props.placeholder}
					onKeyDown={this.onKeyDownAdd.bind(this)}
					onChange={this.onChangeHandler.bind(this)}
					ref={this.textareaRef}
				></textarea>
				<Button
					onClick={this.addTextHandler.bind(this)}
					isDisabled={!this.props.currentText}
					mainColor='Submit'
				>
					{this.props.children}
				</Button>
			</div>
		);
	}
}

type MapStateToPropsType = {
	userID: number | null,
	name: string | null,
	avatar: string | null
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
	return {
		userID: state.auth.id,
		name: state.auth.login,
		avatar: state.auth.photos.large
	}
}

export const AddItemForm = connect(mapStateToProps)(AddItemFormContainer);