import { EditProfileContainer } from '@/components/Pages/Profile/EditProfile/EditProfileContainer';
import { MessagesContainer } from '@/components/Pages/Messages/MessagesContainer';
import { SettingsContainer } from '@/components/Pages/Settings/SettingsContainer';
import { ProfileContainer } from '@/components/Pages/Profile/ProfileContainer';
import { UsersContainer } from '@/components/Pages/Users/UsersContainer';
import { Music } from '@/components/Pages/Music/Music';
import { Login } from '@/components/Pages/Login/Login';
import { News } from '@/components/Pages/News/News';
import { Redirect, Route } from 'react-router-dom';
import { Layout } from '@/components/Layout/Layout';
import { Component } from 'react';

export class App extends Component<any, any> {

	UNSAFE_componentWillMount() {
		document.body.setAttribute('data-theme', 'light');
	}

	render() {
		return (
			<Layout>
				<Route path='/' exact render={() => <Redirect to={'/profile'} />} />
				<Route path='/profile-settings' render={() => <EditProfileContainer />} />
				<Route path='/profile/:userID?' render={() => <ProfileContainer />} />
				<Route path='/messages/:userID?' render={() => <MessagesContainer />} />
				<Route path='/users' render={() => <UsersContainer />} />
				<Route path='/news' component={News} />
				<Route path='/music' component={Music} />
				<Route path='/settings' component={SettingsContainer} />
				<Route path='/login' component={Login} />
			</Layout>
		);
	}
}