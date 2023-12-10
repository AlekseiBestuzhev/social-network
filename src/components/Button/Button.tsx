import {ComponentPropsWithoutRef, ElementType} from 'react';
import cls from '@/components/Button/Button.module.scss'
import classNames from "classnames";

type ButtonType<T extends ElementType> = {
    variant?: 'default' | 'main' | 'green' | 'white' | 'submit',
    size?: 'small' | 'normal' | 'large'
    as?: T
} & ComponentPropsWithoutRef<T>

export const Button = <T extends ElementType>(props: ButtonType<T>) => {
    const {as: Element = 'button', variant = 'default', size = 'normal', className, ...restProps} = props;

    const styles = classNames(cls.button, cls[variant], cls[size], className);

    return <Element {...restProps} className={styles}/>;
}