import {dependsOnSystemSelector} from "@/features/theme/selectors/dependsOnSystemSelector";
import {switchDependencyOnSystem, switchTheme, ThemeVariantType} from '@/features/theme/theme-reducer';
import {themeSelector} from "@/features/theme/selectors/themeSelector";
import { PageTemplate } from '@/components/PageTemplate/PageTemplate';
import {saveThemeToLS} from "@/common/utils/locatStorageUtils.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import cls from '@/pages/Settings/Settings.module.scss';
import { RiSettingsLine } from 'react-icons/ri';
import { RiMoonFill } from 'react-icons/ri';
import { RiMoonLine } from 'react-icons/ri';
import {ChangeEvent} from 'react';

export const Settings = () => {
	const dependsOnSystem = useAppSelector(dependsOnSystemSelector);

	const theme = useAppSelector(themeSelector);

	const dispatch = useAppDispatch();

	const handleThemeChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.currentTarget.checked) {
			const currentValue = e.currentTarget.value as ThemeVariantType | 'system';
			if (currentValue === 'system') {
				dispatch(switchDependencyOnSystem(true));
				localStorage.clear();
			} else {
				if (dependsOnSystem) {
					dispatch(switchDependencyOnSystem(false));
				}
				dispatch(switchTheme(currentValue));
				saveThemeToLS(currentValue);
			}
		}
	}

		return (
			<PageTemplate pageTitle='Settings'>
				<h3 className={cls.title}>Theme mode:</h3>
				<div className={cls.buttons}>
					<label>
						<input
							type="radio"
							name="theme"
							value="system"
							checked={dependsOnSystem}
							onChange={handleThemeChange}
						/>
						System <RiSettingsLine/>
					</label>
					<label>
						<input
							type="radio"
							name="theme"
							value="light"
							checked={theme === 'light' && !dependsOnSystem}
							onChange={handleThemeChange}
						/>
						Light {theme === 'light' ? <RiMoonLine /> : <RiMoonFill />}
					</label>
					<label>
						<input
							type="radio"
							name="theme"
							value="dark"
							checked={theme === 'dark' && !dependsOnSystem}
							onChange={handleThemeChange}
						/>
						Dark {theme === 'light' ? <RiMoonFill /> : <RiMoonLine />}
					</label>
				</div>
			</PageTemplate>
		)
}