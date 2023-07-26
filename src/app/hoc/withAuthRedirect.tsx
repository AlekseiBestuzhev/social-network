import {authUserSelector} from "@/features/auth/selectors/authUserSelector/authUserSelector.ts";
import {isAppInitSelector} from "@/features/service/selectors/isAppInitSelector";
import {Loading} from '@/components/common/Loading/Loading.tsx';
import {useAppSelector} from "@/app/hooks.ts";
import {Navigate} from "react-router-dom"
import {ComponentType} from 'react';

export const withAuthRedirect = <T,>(Component: ComponentType<T>) => {

	return (props: T) => {

		const isAuth = useAppSelector(authUserSelector);
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