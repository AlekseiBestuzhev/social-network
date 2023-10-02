import {EditProfile} from "@/features/profile/components/EditProfile/EditProfile.tsx";
import {authUserIDSelector} from "@/features/auth/selectors/authUserIDSelector";
import {Loading} from "@/components/Loading/Loading.tsx";
import {Navigate, Route, Routes} from "react-router-dom";
import {Settings} from "@/pages/Settings/Settings.tsx";
import {Music} from "@/pages/Music/Music.tsx";
import {Login} from "@/pages/Login/Login.tsx";
import {useAppSelector} from "@/app/hooks.ts";
import {News} from "@/pages/News/News.tsx";
import {lazy, Suspense} from "react";

const Users = lazy(
   () => import("@/pages/Users/Users.tsx").then(module => ({default: module.Users}))
);
const Profile = lazy(
   () => import("@/pages/Profile/Profile.tsx").then(module => ({default: module.Profile}))
);
const Messages = lazy(
   () => import("@/pages/Messages/Messages.tsx").then(module => ({default: module.Messages}))
);

export const AppRouting = () => {

   const authUser = useAppSelector(authUserIDSelector);

   return (
      <Routes>
         <Route path='/' element={<Navigate to={'/profile'}/>}/>
         <Route path='/profile/settings' element={<EditProfile/>}/>
         <Route path='/profile/:userID?' element={(
            <Suspense fallback={<Loading/>}>
               <Profile/>
            </Suspense>
         )}/>
         <Route path='/messages/:userID?' element={(
            <Suspense fallback={<Loading/>}>
               <Messages/>
            </Suspense>
         )}/>
         <Route path='/users' element={(
            <Suspense fallback={<Loading/>}>
               <Users/>
            </Suspense>
         )}/>
         <Route path='/news' element={<News/>}/>
         <Route path='/music' element={<Music/>}/>
         <Route path='/settings' element={<Settings/>}/>
         {
            authUser
               ? <Route path='/login' element={<Navigate to={'/profile'}/>}/>
               : <Route path='/login' element={<Login/>}/>
         }
      </Routes>
   )
}