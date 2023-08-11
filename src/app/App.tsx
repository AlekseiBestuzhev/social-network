import {EditProfile} from "@/features/profile/components/EditProfile/EditProfile.tsx";
import {useTheme} from "@/features/theme/hooks/useTheme.ts";
import { Navigate, Routes, Route } from 'react-router-dom';
import { Settings } from "@/pages/Settings/Settings.tsx";
import { Layout } from '@/components/Layout/Layout.tsx';
import { Messages } from '@/pages/Messages/Messages';
import {Profile} from "@/pages/Profile/Profile.tsx";
import { Login } from '@/pages/Login/Login.tsx';
import { Music } from '@/pages/Music/Music.tsx';
import {Users} from "@/pages/Users/Users.tsx";
import { News } from '@/pages/News/News.tsx';
import {useLayoutEffect} from 'react';

export const App = () => {

	const theme = useTheme();

	useLayoutEffect(() => {
			document.body.setAttribute('data-theme', theme);
	}, [theme]);

		return (
			<Layout>
				<Routes>
					<Route path='/' element={<Navigate to={'/profile'} />} />
					<Route path='/profile/settings' element={<EditProfile />} />
					<Route path='/profile/:userID?' element={<Profile />} />
					<Route path='/messages/:userID?' element={<Messages />} />
					<Route path='/users' element={<Users />} />
					<Route path='/news' element={<News/>} />
					<Route path='/music' element={<Music/>} />
					<Route path='/settings' element={<Settings/>} />
					<Route path='/login' element={<Login/>} />
				</Routes>
			</Layout>
		);
	}