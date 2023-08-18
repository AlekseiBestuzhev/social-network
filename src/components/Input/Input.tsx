import {FC, forwardRef, InputHTMLAttributes, Ref} from "react";
import cls from "@/components/Input/Input.module.scss";
import classNames from "classnames";

type PropsType = InputHTMLAttributes<HTMLInputElement> & {
   title?: string,
   error?: string
}

export const Input: FC<PropsType> = forwardRef(({
                                                   title,
                                                   error,
                                                   placeholder,
                                                   ...restProps
                                                }, ref: Ref<HTMLInputElement>) => {

   const placeholderClasses = classNames(cls.message, {
      [cls.error]: error
   })

   const inputClasses = classNames(cls.input, {
      [cls.error]: error
   })

   return (
      <label className={cls.wrapper}>
         {title && <p className={cls.title}>{title}:</p>}
         <input ref={ref} {...restProps}  className={inputClasses}/>
         <span className={placeholderClasses}>{error || placeholder}</span>
      </label>
   );
})