import cls from '@/components/Input/Input.module.scss';
import {ChangeEvent, FC, InputHTMLAttributes} from 'react';

type PropsType = InputHTMLAttributes<HTMLInputElement> & {
	title?: string,
	value?: string,
	onChange?: (value: string) => void
}

export const Input: FC<PropsType> = ({ title, value, onChange, ...restProps }) => {

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		if (onChange) {
			onChange(e.currentTarget.value);
		}
	}

	return (
		<label className={cls.wrapper}>
			{title && <p className={cls.title}>{title}:</p>}
			<input
				value={value}
				{...restProps}
				className={cls.input}
				onChange={onChangeHandler}
			/>
		</label>
	);
}