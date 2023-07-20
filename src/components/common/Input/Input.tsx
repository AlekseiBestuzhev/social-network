import cls from '@/components/common/Input/Input.module.scss';
import { ChangeEvent, FC } from 'react';

type PropsType = {
	ID: string,
	title: string,
	value: string,
	onChange: (value: string) => void
}

export const Input: FC<PropsType> = ({ ID, title, value, onChange }) => {

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		onChange(e.currentTarget.value)
	}

	return (
		<label htmlFor={ID} className={cls.wrapper}>
			<p className={cls.title}>{title}:</p>
			<input
				value={value}
				onChange={onChangeHandler}
				className={cls.status}
				type="text" id={ID}
				name={ID} />
		</label>
	);
}