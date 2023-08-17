import {isAppInitSelector} from "@/features/service/selectors/isAppInitSelector";
import {authUserIDSelector} from "@/features/auth/selectors/authUserIDSelector";
import {Loading} from "@/components/Loading/Loading.tsx";
import {useAppSelector} from "@/app/hooks.ts";
import {Navigate} from "react-router-dom"
import {ComponentType} from "react";

export const withAuthRedirect = <T,>(Component: ComponentType<T>) => {

	return (props: T) => {

		const isAuth = useAppSelector(authUserIDSelector);
		const isAppInit = useAppSelector(isAppInitSelector);

		return (
			isAppInit
				? isAuth
					? <Component {...props as T & object} />
					: <Navigate to='/login'/>
				: <Loading/>
		)
	}
}