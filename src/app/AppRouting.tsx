import {EditProfile} from "@/features/profile/components/EditProfile/EditProfile.tsx";
import {authUserIDSelector} from "@/features/auth/selectors/authUserIDSelector";
import {Navigate, Route, Routes} from "react-router-dom";
import {Messages} from "@/pages/Messages/Messages.tsx";
import {Settings} from "@/pages/Settings/Settings.tsx";
import {Profile} from "@/pages/Profile/Profile.tsx";
import {Users} from "@/pages/Users/Users.tsx";
import {Music} from "@/pages/Music/Music.tsx";
import {Login} from "@/pages/Login/Login.tsx";
import {useAppSelector} from "@/app/hooks.ts";
import {News} from "@/pages/News/News.tsx";

export const AppRouting = () => {

   const authUser = useAppSelector(authUserIDSelector);

   return (
      <Routes>
         <Route path='/' element={<Navigate to={'/profile'} />} />
         <Route path='/profile/settings' element={<EditProfile />} />
         <Route path='/profile/:userID?' element={<Profile />} />
         <Route path='/messages/:userID?' element={<Messages />} />
         <Route path='/users' element={<Users />} />
         <Route path='/news' element={<News/>} />
         <Route path='/music' element={<Music/>} />
         <Route path='/settings' element={<Settings/>} />
         {
            authUser
               ? <Route path='/login' element={<Navigate to={'/profile'} />} />
               : <Route path='/login' element={<Login/>} />
         }
      </Routes>
   )
}