import { SettingsPropsType } from '@/pages/Settings/SettingsContainer';
import { PageTemplate } from '@/components/PageTemplate/PageTemplate';
import { ThemeVariantType } from '@/features/theme/theme-reducer';
import cls from '@/pages/Settings/Settings.module.scss';
import { ChangeEvent, Component } from 'react';
import { RiMoonFill } from 'react-icons/ri';
import { RiMoonLine } from 'react-icons/ri';

export class Settings extends Component<SettingsPropsType> {

	componentDidUpdate(prevProps: Readonly<SettingsPropsType>) {
		if (prevProps.current !== this.props.current) {
			document.body.setAttribute('data-theme', this.props.current);
		}
	}

	handleThemeChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.currentTarget.checked) {
			const currentValue = e.currentTarget.value as ThemeVariantType;
			this.props.switchTheme(currentValue);
		}
	}

	render() {
		return (
			<PageTemplate pageTitle='Settings'>
				<h3 className={cls.title}>Theme switcher</h3>
				<div className={cls.buttons}>
					<label>
						<input
							type="radio"
							name="theme"
							value="light"
							checked={this.props.current === 'light'}
							onChange={this.handleThemeChange}
						/>
						Light mode {this.props.current === 'light' ? <RiMoonLine /> : <RiMoonFill />}
					</label>
					<label>
						<input
							type="radio"
							name="theme"
							value="dark"
							checked={this.props.current === 'dark'}
							onChange={this.handleThemeChange}
						/>
						Dark mode {this.props.current === 'light' ? <RiMoonFill /> : <RiMoonLine />}
					</label>
				</div>
			</PageTemplate>
		);
	}
}