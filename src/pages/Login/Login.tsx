import { PageTemplate } from "@/components/PageTemplate/PageTemplate"
import {Button} from "@/components/Button/Button";

export const Login = () => {

	return (
		<PageTemplate pageTitle="Login">
			<form>
				<input autoComplete='username' placeholder='Login'/>
				<input name="password" type="password" autoComplete='current-password' placeholder='Password' />
				<label htmlFor="rememberMe">
					<input id="rememberMe" name="rememberMe" type="checkbox" />
					Remember me
				</label>
				<Button variant='main' onClick={() => { }}>Log In</Button>
			</form>
		</PageTemplate>
	);
}