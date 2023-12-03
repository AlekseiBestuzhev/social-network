import {useForm, SubmitHandler} from "react-hook-form";
import {Button} from "@/components/Button/Button.tsx";
import {login} from "@/features/auth/auth-thunks.ts";
import {Input} from "@/components/Input/Input.tsx";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {CSSProperties} from "react";

export type LoginFormType = {
   email: string,
   password: string,
   rememberMe: boolean
};

export const LoginForm = () => {

   const dispatch = useAppDispatch();

   const {register, handleSubmit, formState: {errors}} = useForm<LoginFormType>({mode: "onTouched"});
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
               {...register("email", {
                  required: {
                     value: true,
                     message: 'Field is required'
                  },
                  pattern: {
                     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                     message: 'Invalid email'
                  }
               })}
               error={errors.email?.message}
               autoComplete='username'
               placeholder='Email'
            />
            <Input
               {...register("password", {
                  required: {
                     value: true,
                     message: 'Field is required'
                  },
                  minLength: {
                     value: 4,
                     message: 'Min count is 4'
                  }
               })}
               error={errors.password?.message}
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