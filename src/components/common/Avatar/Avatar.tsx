import defaultAvatarDark from '@/assets/images/default-avatar-dark.svg';
import defaultAvatar from '@/assets/images/default-avatar.svg';
import { ThemeType } from '@/redux/theme/theme-reducer';
import { AppStateType } from '@/redux/redux-store';
import { CSSProperties, Component, memo } from 'react';
import { connect } from 'react-redux';

type ThemedImageProps = ThemeType & {
	photo: string | null,
	onClick?: () => void,
	border?: boolean,
	size?: string,
}

class ThemedImage extends Component<ThemedImageProps> {

	render() {

		const photoHandler = this.props.photo
			? this.props.photo
			: this.props.current === 'light'
				? defaultAvatar
				: defaultAvatarDark

		const styleHandler: CSSProperties = {
			width: this.props.size || '5rem',
			height: this.props.size || '5rem',
			borderRadius: '100%',
			objectFit: 'cover',
			border: this.props.border ? '0.3rem solid var(--colors-bg-extra)' : 'none',
			cursor: this.props.photo && this.props.onClick ? 'pointer' : 'auto'
		}

		const onClickHandler = () => {
			this.props.photo && this.props.onClick && this.props.onClick()
		}

		return (
			<img
				src={photoHandler}
				style={styleHandler}
				onClick={onClickHandler}
				alt='Default avatar'
			/>
		)
	}
}

const mapStateToProps = (state: AppStateType): ThemeType => ({
	current: state.theme.current
});

export const Avatar = memo(connect(mapStateToProps)(ThemedImage));