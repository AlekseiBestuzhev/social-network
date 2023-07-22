import { PageTemplate } from "@/components/common/PageTemplate/PageTemplate"
import {Button} from "@/components/common/Button/Button";

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
				<Button variant='Main' onClick={() => { }}>Log In</Button>
			</form>
		</PageTemplate>
	);
}