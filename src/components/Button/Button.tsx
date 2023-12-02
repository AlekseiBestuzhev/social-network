import {ComponentPropsWithoutRef, FC} from 'react';
import cls from '@/components/Button/Button.module.scss'
import classNames from "classnames";

type ButtonType = {
    variant?: 'default' | 'main' | 'green' | 'white' | 'submit',
    size?: 'small' | 'normal' | 'large'
} & ComponentPropsWithoutRef<'button'>

export const Button: FC<ButtonType> = ({variant, size, children, ...restProps}) => {

    const styles = classNames(cls.button,
        variant && cls[variant] || cls.Default,
        size && cls[size] || cls.normal,
        restProps.className
    );

    return (
        <button
            {...restProps}
            className={styles}
        >
            {children}
        </button>
    );
}