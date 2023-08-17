import cls from "@/components/Layout/Header/Header.module.scss";
import {useAuth} from "@/features/auth/hooks/useAuth.ts";
import {NavLink, useNavigate} from "react-router-dom";
import { Avatar } from "@/components/Avatar/Avatar";
import { Button } from "@/components/Button/Button";
import logo from "@/assets/images/logo.svg";

export const Header = () => {

	const {authUserID, authUserName, authUserAvatar} = useAuth();

	const navigate = useNavigate();

	const onClickHandler = () => {
		navigate('/login');
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
					authUserID
						? <NavLink to={'/profile'}>
							<div className={cls.userInfo}>
								<p>{authUserName}</p>
								<Avatar size='2.5rem' photo={authUserAvatar} />
							</div>
						</NavLink>
						: <Button variant="white" onClick={onClickHandler}> LOGIN </Button>
				}
			</div>
		</header>
	)
}