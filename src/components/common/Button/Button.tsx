import cls from '@/components/common/Button/Button.module.scss'
import { FC, ReactNode } from 'react';

type MainColorType = 'Default' | 'Main' | 'Green' | 'White' | 'Submit';

type ButtonType = {
	children: ReactNode,
	onClick: () => void,
	mainColor?: MainColorType,
	isDisabled?: boolean,
	size?: 'small' | 'normal' | 'large';
}

export const Button: FC<ButtonType> = ({ onClick, children, mainColor, isDisabled, size }) => {

	const styles = `${cls.button} ${mainColor ? cls[`${mainColor}`] : cls.Default} ${size ? cls[`${size}`] : cls.normal}`

	return (
		<button
			onClick={onClick}
			disabled={isDisabled}
			className={styles}
		>
			{children}
		</button>
	);
}