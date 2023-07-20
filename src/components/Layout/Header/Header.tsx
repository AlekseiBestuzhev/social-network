import cls from '@/components/Layout/Header/Header.module.scss';
import { Button } from "@/components/common/Button/Button";
import { Avatar } from "@/components/common/Avatar/Avatar";
import { HeaderType } from "./HeaderContainer";
import { NavLink } from "react-router-dom";
import logo from '@/assets/images/logo.svg';
import { FC, memo } from "react";

export const Header: FC<HeaderType> = memo(({ isAuth, login, photos }) => {

	const onClickHandler = () => {
		alert('This function didn\'t work yet')
	}

	return (
		<header className={cls.header}>
			<div className={cls.wrapper}>
				<img
					style={{ fill: 'red' }}
					src={logo}
					alt={'Logo'}
				/>
				{
					isAuth
						? <NavLink to={'/profile'}>
							<div className={cls.userInfo}>
								<p>{login}</p>
								<Avatar size='2.5rem' photo={photos.large} />
							</div>
						</NavLink>
						: <NavLink to={'/login'}>
							<Button mainColor="White" onClick={onClickHandler}> LOGIN </Button>
						</NavLink>
				}
			</div>
		</header>
	)
})