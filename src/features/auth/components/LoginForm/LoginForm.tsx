import {useForm, SubmitHandler } from "react-hook-form";
import {Button} from "@/components/Button/Button.tsx";
import {CSSProperties} from "react";
import {Input} from "@/components/Input/Input.tsx";

export type LoginFormType = {
   login: string,
   password: string,
   rememberMe: boolean
};

export const LoginForm = () => {

   const { register, handleSubmit } = useForm<LoginFormType>();
   const onSubmit: SubmitHandler<LoginFormType> = data => console.log(data);

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
               {...register("login", { required: true })}
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