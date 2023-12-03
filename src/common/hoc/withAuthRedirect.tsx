import {authUserIDSelector} from "@/features/auth/selectors/authUserIDSelector";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {Navigate} from "react-router-dom"
import {ComponentType} from "react";

export const withAuthRedirect = <T, >(Component: ComponentType<T>) => {

   return (props: T) => {

      const isAuth = useAppSelector(authUserIDSelector);

      return (
         isAuth
            ? <Component {...props as T & object} />
            : <Navigate to='/login'/>
      )
   }
}