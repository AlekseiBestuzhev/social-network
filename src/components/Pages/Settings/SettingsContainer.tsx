import { ThemeType, ThemeVariantType, switchTheme } from "@/features/theme/theme-reducer";
import { Settings } from "@/components/Pages/Settings/Settings";
import { AppRootStateType } from "@/app/store.ts";
import { connect } from "react-redux";

type MapDispatchToPropsType = {
	switchTheme: (newTheme: ThemeVariantType) => void
}

export type SettingsPropsType = MapDispatchToPropsType & ThemeType;

const mapStateToProps = (state: AppRootStateType): ThemeType => ({
	current: state.theme.current
})

export const SettingsContainer = connect(mapStateToProps, {
	switchTheme
} as MapDispatchToPropsType)(Settings);