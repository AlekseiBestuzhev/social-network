import {useForm, SubmitHandler } from "react-hook-form";
import {Button} from "@/components/Button/Button.tsx";
import {login} from "@/features/auth/auth-thunks.ts";
import {Input} from "@/components/Input/Input.tsx";
import {useAppDispatch} from "@/app/hooks.ts";
import {CSSProperties} from "react";

export type LoginFormType = {
   email: string,
   password: string,
   rememberMe: boolean
};

export const LoginForm = () => {

   const dispatch = useAppDispatch();

   const { register, handleSubmit } = useForm<LoginFormType>();
   const onSubmit: SubmitHandler<LoginFormType> = data => {
      dispatch(login(data));
   }

   const styles: CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      rowGap: '1.5rem',
      width: '100%'
   }

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div style={styles}>
            <Input
               {...register("email", { required: true })}
               autoComplete='username'
               placeholder='Login'
            />
            <Input
               {...register("password", { required: true })}
               autoComplete='current-password'
               placeholder='Password'
               type="password"
            />
            <label htmlFor="rememberMe">
               <input id="rememberMe" type="checkbox" {...register("rememberMe")}/>
               <span style={{marginLeft: '0.5rem'}}>Remember me</span>
            </label>
            <Button variant='main'>Log In</Button>
         </div>
      </form>
   )
}