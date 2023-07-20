import { ThemeType, ThemeVariantType, switchTheme } from "@/redux/theme/theme-reducer";
import { Settings } from "@/components/Pages/Settings/Settings";
import { AppStateType } from "@/redux/redux-store";
import { connect } from "react-redux";

type MapDispatchToPropsType = {
	switchTheme: (newTheme: ThemeVariantType) => void
}

export type SettingsPropsType = MapDispatchToPropsType & ThemeType;

const mapStateToProps = (state: AppStateType): ThemeType => ({
	current: state.theme.current
})

export const SettingsContainer = connect(mapStateToProps, {
	switchTheme
} as MapDispatchToPropsType)(Settings);