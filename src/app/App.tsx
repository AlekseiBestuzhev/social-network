import { EditProfileContainer } from '@/components/Pages/Profile/EditProfile/EditProfileContainer.tsx';
//import { MessagesContainer } from '@/components/Pages/Messages/MessagesContainer';
import { SettingsContainer } from '@/components/Pages/Settings/SettingsContainer.tsx';
import { ProfileContainer } from '@/components/Pages/Profile/ProfileContainer.tsx';
import { UsersContainer } from '@/components/Pages/Users/UsersContainer.tsx';
import { Navigate, Routes, Route } from 'react-router-dom';
import { Music } from '@/components/Pages/Music/Music.tsx';
import { Login } from '@/components/Pages/Login/Login.tsx';
import { News } from '@/components/Pages/News/News.tsx';
import { Layout } from '@/components/Layout/Layout.tsx';
import { Component } from 'react';

export class App extends Component {

	UNSAFE_componentWillMount() {
		document.body.setAttribute('data-theme', 'light');
	}

	render() {
		return (
			<Layout>
				<Routes>
					<Route path='/' element={<Navigate to={'/profile'} />} />
					<Route path='/profile-settings' element={<EditProfileContainer />} />
					<Route path='/profile/:userID?' element={<ProfileContainer />} />
					{/*<Route path='/messages/:userID?' element={<MessagesContainer />} />*/}
					<Route path='/users' element={<UsersContainer />} />
					<Route path='/news' element={<News/>} />
					<Route path='/music' element={<Music/>} />
					<Route path='/settings' element={<SettingsContainer/>} />
					<Route path='/login' element={<Login/>} />
				</Routes>
			</Layout>
		);
	}
}