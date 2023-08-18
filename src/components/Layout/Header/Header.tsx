import {NavLink, useMatch, useNavigate} from "react-router-dom";
import cls from "@/components/Layout/Header/Header.module.scss";
import {useAuth} from "@/features/auth/hooks/useAuth.ts";
import {logout} from "@/features/auth/auth-thunks.ts";
import {Avatar} from "@/components/Avatar/Avatar";
import {Button} from "@/components/Button/Button";
import {RiLogoutBoxLine} from "react-icons/ri";
import {useAppDispatch} from "@/app/hooks.ts";
import logo from "@/assets/images/logo.svg";

export const Header = () => {

   const {authUserID, authUserName, authUserAvatar} = useAuth();

   const match = useMatch('/login');

   const dispatch = useAppDispatch();

   const navigate = useNavigate();

   const logoutHandler = () => {
      dispatch(logout())
   }

   const navigateToLoginHandler = () => {
      navigate('/login');
   }

   return (
      <header className={cls.header}>
         <div className={cls.wrapper}>
            <img
               style={{fill: 'red'}}
               src={logo}
               alt={'Logo'}
            />
            {
               authUserID
                  ? <div className={cls.controls}>
                     <Button variant="white" onClick={logoutHandler}> Logout <RiLogoutBoxLine size={'1.125rem'}/> </Button>
                     <NavLink to={'/profile'}>
                        <div className={cls.userInfo}>
                           <p>{authUserName}</p>
                           <Avatar size='2.5rem' photo={authUserAvatar}/>
                        </div>
                     </NavLink>
                  </div>
                  : match
                     ? null
                     : <Button variant="white" onClick={navigateToLoginHandler}> LOGIN </Button>
            }
         </div>
      </header>
   )
}