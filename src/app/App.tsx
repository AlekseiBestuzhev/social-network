import {isAppInitSelector} from "@/features/service/selectors/isAppInitSelector";
import {authThunkCreator} from "@/features/auth/auth-thunks.ts";
import {useAppDispatch, useAppSelector} from "@/app/hooks.ts";
import {useTheme} from "@/features/theme/hooks/useTheme.ts";
import {Loading} from "@/components/Loading/Loading.tsx";
import {Layout} from "@/components/Layout/Layout.tsx";
import {useEffect, useLayoutEffect} from "react";
import {AppRouting} from "@/app/AppRouting.tsx";

export const App = () => {

   const isAppInit = useAppSelector(isAppInitSelector);

   const dispatch = useAppDispatch();

   const theme = useTheme();

   useLayoutEffect(() => {
      document.body.setAttribute('data-theme', theme);
   }, [theme]);

   useEffect(() => {
      dispatch(authThunkCreator());
   }, []);

   return (
      isAppInit
         ? <Layout>
            <AppRouting/>
         </Layout>
         : <Loading/>
   );
}