import cls from '@/components/common/PageTemplate/PageTemplate.module.scss';
import { FC, ReactNode } from "react";

type PageTemplateType = {
	children: ReactNode,
	pageTitle: string
}

export const PageTemplate: FC<PageTemplateType> = ({ children, pageTitle }) => {

	return (
		<div className={cls.container}>
			<h2 className={cls.pageTitle}>{pageTitle}</h2 >
			<div className={cls.content}>
				{children}
			</div>
		</div>
	);
}