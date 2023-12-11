import cls from '@/components/SectionInfo/SectionInfo.module.scss'
import {Button} from "@/components/Button/Button.tsx";
import {Link} from "react-router-dom";
import {FC, memo} from 'react';
import {routes} from "@/common/const";

type SectionInfoType = {
    text?: string,
    picture?: string,
    pictureWebp?: string,
    size?: string
    withNavToProfile?: boolean
}

export const SectionInfo: FC<SectionInfoType> = memo(({text, picture, pictureWebp, size, withNavToProfile}) => {

    return (
        <div className={cls.wrapper}>
            <div className={cls.info}>
                {picture && (
                    <picture>
                        <source srcSet={pictureWebp} type="image/webp"/>
                        <img style={{width: size || '12rem'}} src={picture} alt='Info'/>
                    </picture>
                )}
                {withNavToProfile && (
                    <Button variant='main' as={Link} to={routes.profile}>Go back to profile</Button>
                )}
                {text && <p>{text}</p>}
            </div>
        </div>
    );
})