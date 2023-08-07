import { PageTemplate } from '@/components/PageTemplate/PageTemplate';
import {switchTheme, ThemeVariantType} from '@/features/theme/theme-reducer';
import cls from '@/pages/Settings/Settings.module.scss';
import {ChangeEvent, useEffect} from 'react';
import { RiMoonFill } from 'react-icons/ri';
import { RiMoonLine } from 'react-icons/ri';
import {useAppDispatch, useAppSelector} from "@/app/hooks.ts";
import {AppRootStateType} from "@/app/store.ts";

export const Settings = () => {

	const theme = useAppSelector((state: AppRootStateType): ThemeVariantType => state.theme.current);

	const dispatch = useAppDispatch();

	useEffect(() => {
		document.body.setAttribute('data-theme', theme);
	}, [theme]);

	const handleThemeChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.currentTarget.checked) {
			const currentValue = e.currentTarget.value as ThemeVariantType;
			dispatch(switchTheme(currentValue));
		}
	}

		return (
			<PageTemplate pageTitle='Settings'>
				<h3 className={cls.title}>Theme switcher</h3>
				<div className={cls.buttons}>
					<label>
						<input
							type="radio"
							name="theme"
							value="light"
							checked={theme === 'light'}
							onChange={handleThemeChange}
						/>
						Light mode {theme === 'light' ? <RiMoonLine /> : <RiMoonFill />}
					</label>
					<label>
						<input
							type="radio"
							name="theme"
							value="dark"
							checked={theme === 'dark'}
							onChange={handleThemeChange}
						/>
						Dark mode {theme === 'light' ? <RiMoonFill /> : <RiMoonLine />}
					</label>
				</div>
			</PageTemplate>
		)
}