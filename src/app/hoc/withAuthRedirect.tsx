import { Loading } from '@/components/common/Loading/Loading.tsx';
import { AppRootStateType } from '@/app/store.ts';
import { Navigate } from "react-router-dom";
import { connect } from 'react-redux';
import { ComponentType } from 'react';

type MapStateToPropsType = {
	authInProgress: boolean,
	isAuth: boolean
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({
	isAuth: state.auth.isAuth,
	authInProgress: state.auth.inProgress
});

export const withAuthRedirect = <T,>(Component: ComponentType<T>) => {

	const RedirectComponent = (props: MapStateToPropsType) => {

		const { isAuth, authInProgress, ...restProps } = props;

		return (
			authInProgress
				? <Loading />
				: isAuth
					? <Component {...restProps as T & object} />
					: <Navigate to='/login' />
		)
	}

	return connect(mapStateToProps)(RedirectComponent);
}