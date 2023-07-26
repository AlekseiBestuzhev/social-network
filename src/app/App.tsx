import {EditProfile} from "@/features/profile/components/EditProfile/EditProfile.tsx";
import { SettingsContainer } from "@/components/Pages/Settings/SettingsContainer.tsx";
//import { MessagesContainer } from '@/components/Pages/Messages/MessagesContainer';
import { Navigate, Routes, Route } from 'react-router-dom';
import { Music } from '@/components/Pages/Music/Music.tsx';
import { Login } from '@/components/Pages/Login/Login.tsx';
import { News } from '@/components/Pages/News/News.tsx';
import { Layout } from '@/components/Layout/Layout.tsx';
import {Profile} from "@/Pages/Profile/Profile.tsx";
import {Users} from "@/Pages/Users/Users.tsx";
import {useLayoutEffect} from 'react';

export const App = () => {

	useLayoutEffect(() => {
		document.body.setAttribute('data-theme', 'light');
	}, []);

		return (
			<Layout>
				<Routes>
					<Route path='/' element={<Navigate to={'/profile'} />} />
					<Route path='/profile/settings' element={<EditProfile />} />
					<Route path='/profile/:userID?' element={<Profile />} />
					{/*<Route path='/messages/:userID?' element={<MessagesContainer />} />*/}
					<Route path='/users' element={<Users />} />
					<Route path='/news' element={<News/>} />
					<Route path='/music' element={<Music/>} />
					<Route path='/settings' element={<SettingsContainer/>} />
					<Route path='/login' element={<Login/>} />
				</Routes>
			</Layout>
		);
	}