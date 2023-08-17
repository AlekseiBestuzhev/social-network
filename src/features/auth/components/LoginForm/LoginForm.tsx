import {Input} from "@/components/Input/Input.tsx";
import {Button} from "@/components/Button/Button.tsx";
import {CSSProperties} from "react";

export const LoginForm = () => {

   const styles: CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      rowGap: '1.5rem',
      width: '100%'
   }

   return (
      <form>
         <div style={styles}>
            <Input autoComplete='username' placeholder='Login'/>
            <Input name="password" type="password" autoComplete='current-password' placeholder='Password'/>
            <label htmlFor="rememberMe">
               <input id="rememberMe" name="rememberMe" type="checkbox"/>
               Remember me
            </label>
            <Button variant='main' onClick={() => {
            }}>Log In</Button>
         </div>
      </form>
   )
}