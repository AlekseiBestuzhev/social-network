import {FC, forwardRef, InputHTMLAttributes, Ref} from 'react';
import cls from '@/components/Input/Input.module.scss';

type PropsType = InputHTMLAttributes<HTMLInputElement> & {
	title?: string
}

export const Input: FC<PropsType> = forwardRef(({ title, ...restProps }, ref: Ref<HTMLInputElement>) => {

	return (
		<label className={cls.wrapper}>
			{title && <p className={cls.title}>{title}:</p>}
			<input ref={ref}{...restProps} className={cls.input} />
		</label>
	);
})