import {ButtonHTMLAttributes, FC, PropsWithChildren} from 'react';
import cls from '@/components/Button/Button.module.scss'
import classNames from "classnames";

type ButtonType = PropsWithChildren & ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: 'default' | 'main' | 'green' | 'white' | 'submit',
	size?: 'small' | 'normal' | 'large'
}

export const Button: FC<ButtonType> = ({ variant, size, children, ...restProps }) => {

	const styles = classNames(cls.button,
		variant && cls[variant] || cls.Default,
		size && cls[size] || cls.normal
	);

	return (
		<button
			{...restProps}
			className={styles}
		>
			{children}
		</button>
	);
}