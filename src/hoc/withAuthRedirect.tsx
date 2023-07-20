import { Loading } from '@/components/common/Loading/Loading';
import { AppStateType } from '@/redux/redux-store';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { ComponentType } from 'react';

type MapStateToPropsType = {
	authInProgress: boolean,
	isAuth: boolean
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
	isAuth: state.auth.isAuth,
	authInProgress: state.auth.inProgress
});

export const withAuthRedirect = <T,>(Component: ComponentType<T>) => {

	const RedirectComponent = (props: MapStateToPropsType) => {

		const { isAuth, authInProgress, ...restProps } = props;

		return (
			props.authInProgress
				? <Loading />
				: props.isAuth
					? <Component {...restProps as T & {}} />
					: <Redirect to='/login' />
		)
	}

	return connect(mapStateToProps)(RedirectComponent);
}