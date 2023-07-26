import cls from '@/components/SectionInfo/SectionInfo.module.scss'
import { FC, memo } from 'react';

type SectionInfoType = {
	text: string,
	picture?: string,
	size?: string
}

export const SectionInfo: FC<SectionInfoType> = memo(({ text, picture, size }) => {

	return (
		<div className={cls.wrapper}>
			<div className={cls.info}>
				{picture && <img style={{ width: size || '12rem' }} src={picture} alt='Info' />}
				<p>{text}</p>
			</div>
		</div>
	);
})