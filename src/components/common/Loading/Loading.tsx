import c from './Loader.module.scss';

export const Loading = () => {

	return (
		<div className={c.wrapper}>
			<div className={c.loader}></div>
		</div>
	);
}